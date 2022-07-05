const https = require('https');
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
const appsyncUrl = process.env.API_URL;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const graphqlQuery = require('./query.js').createCustomerTransactions;
const invokeGetCustomer = require('./lambdas/invokeGetCustomer');

/* action types */
const VISIT = process.env.VISIT;
const SUBSCRIPTION = process.env.SUBSCRIPTION;
const UNSUBSCRIPTION = process.env.UNSUBSCRIPTION;
const REMINDER_MESSAGE = process.env.REMINDER_MESSAGE;
const SUBSCRIPTION_MESSAGE = process.env.SUBSCRIPTION_MESSAGE;
const UNSUBSCRIPTION_MESSAGE = process.env.UNSUBSCRIPTION_MESSAGE;

/* collected item types */
const NA = process.env.NA;
const KSH = process.env.CURRENCY;
const JERRYCANS = process.env.JERRYCANS;

/* collected count types */
const NONE = Number(process.env.NONE);
const JERRYCANS_PER_TRIP = Number(process.env.JERRYCANS_PER_TRIP);

/* status types */
const SUCCESS = process.env.SUCCESS;
const FAILURE = process.env.FAILURE;

exports.handler = async (event) => {
    const req = new AWS.HttpRequest(appsyncUrl, region);

    console.log("EVENT:");
    console.log(event);
    
    let getCustomerInput = {
        byID: true,
        customerID: event.customerID
    };
    let customer = await invokeGetCustomer(getCustomerInput);
    
    if (!customer) {
        event['isTransactionRecorded'] = false;
        return event;
    }
    
    console.log("CUSTOMER:");
    console.log(customer);
    
    /* calculate ttl <- time to live in dynamodb table*/
    const date = new Date();
    date.setMonth(date.getMonth()+1);
    const timeToLive = Math.round(date.getTime()/1000);
    
    console.log("Time to live: ");
    console.log(timeToLive);
    
    /* create record */
    let createTransactionInput = {
        action: event.action,
        fullName: customer.firstName + " " + customer.lastName,
        siteID: customer.siteID,
        siteName: customer.site.name,
        userPhoneNumber: customer.phoneNumber,
        ttl: timeToLive,
        status: event.isSuccess? SUCCESS: FAILURE
    };
    
    if (event.action === SUBSCRIPTION) {
        createTransactionInput['collectedItemType'] = KSH;
        createTransactionInput['collectedCount'] = customer.site.subscriptionFee;
    } else if (event.action === VISIT) {
        createTransactionInput['collectedItemType'] = JERRYCANS;
        createTransactionInput['collectedCount'] = JERRYCANS_PER_TRIP;
    } else if (event.action === UNSUBSCRIPTION || event.action === REMINDER_MESSAGE ||
            event.action === UNSUBSCRIPTION_MESSAGE || event.action === SUBSCRIPTION_MESSAGE) {
        createTransactionInput['collectedItemType'] = NA;
        createTransactionInput['collectedCount'] = NONE;
    }

    const payload = {
        createCustomerTransactionInput: createTransactionInput
    };
    
    console.log("TRANSACTION PAYLOAD:");
    console.log(payload);

    req.method = "POST";
    req.path = "/graphql";
    req.headers.host = endpoint;
    req.headers["Content-Type"] = "application/json";
    req.body = JSON.stringify({
        query: graphqlQuery,
        operationName: "createCustomerTransactions",
        variables: payload
    });

    const signer = new AWS.Signers.V4(req, "appsync", true);
    signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

    const data = await new Promise((resolve, reject) => {
        const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
            let data = "";

            result.on("data", (chunk) => {
                data += chunk;
            });

            result.on("end", () => {
                resolve(JSON.parse(data.toString()));
            });
        });

        httpRequest.write(req.body);
        httpRequest.end();
    });
    
    console.log("DATA:");
    console.log(data);
    
    event['isTransactionRecorded'] = (data.data !== null);
    
    return event;
};