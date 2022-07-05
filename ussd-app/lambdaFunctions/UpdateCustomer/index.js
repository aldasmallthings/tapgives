const https = require('https');
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
const appsyncUrl = process.env.API_URL;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const queries = require('./queries.js');

/* subscription types */
const VALID_SUBSCRIPTION = process.env.SUBSCRIPTION_VALID;
const INVALID_SUBSCRIPTION = process.env.SUBSCRIPTION_INVALID;

const NO_MONTHLY_SUBSCRIPTION_CODE = process.env.NA;
const NO_JERRYCANS_ALLOWED = Number(process.env.NONE);
const DAYS_OF_SUBSCRIPTION = Number(process.env.DAYS_OF_SUBSCRIPTION);

exports.handler = async (event) => {
    const req = new AWS.HttpRequest(appsyncUrl, region);
    
    let updateInput;
    let graphqlQuery;
    
    if (event.updateSubscription) {
        // get expiration date and monthly subscription code
        let date = new Date();
        let expirationDate, monthlySubCode, jerrycansAllowed;
        
        if (event.validSubscription === VALID_SUBSCRIPTION) {
            /*e.x -> expiration date = today + 30 days*/
            date.setDate(date.getDate() + DAYS_OF_SUBSCRIPTION);
            monthlySubCode = generateMonthlyCode(event.customerID);
            jerrycansAllowed = event.siteExpectedJerrycans;
            
        } else if (event.validSubscription === INVALID_SUBSCRIPTION) {
            monthlySubCode = NO_MONTHLY_SUBSCRIPTION_CODE;
            jerrycansAllowed = NO_JERRYCANS_ALLOWED;
        }
        
        expirationDate = date.toISOString().substring(0,10);
        
        graphqlQuery = queries.updateSubscription;
        updateInput = {
            id: event.customerID,
            validSubscription: event.validSubscription, // changing subscription
            subscriptionExpiration: expirationDate,
            monthlySubscriptionCode: monthlySubCode,
            jerrycansAllowed: jerrycansAllowed
        };
        
    } else if (event.updatePhoneNumber) {
        graphqlQuery = queries.updatePhoneNumber;
        updateInput = {
            id: event.customerID,
            phoneNumber: event.phoneNumber
        };
        
    } else if (event.updateJerrycansAllowed) {
        graphqlQuery = queries.updateJerrycansAllowed;
        updateInput = {
            id: event.customerID,
            jerrycansAllowed: event.jerrycansAllowed
        };
        
    }
    
    
    const payload = {
        updateCustomerInput: updateInput
    };

    req.method = "POST";
    req.path = "/graphql";
    req.headers.host = endpoint;
    req.headers["Content-Type"] = "application/json";
    req.body = JSON.stringify({
        query: graphqlQuery,
        operationName: "updateCustomer",
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
    
    console.log("DATA: ");
    console.log(data);
    
    event['isUpdateSuccessful'] = (data.data.updateCustomer != null);
    
    return event;
};

function generateMonthlyCode(customerID) {
  // want 5 digit code
  
  // get 3 random digits
  let min = 100;
  let max = 999;
  let nums = Math.floor(Math.random() * (max - min + 1) + min);
  
  // get last two chars of customerID
  let endChars = customerID.substring(customerID.length - 2, customerID.length);
  
  let code = String(nums) + endChars;
  
  return code;
}