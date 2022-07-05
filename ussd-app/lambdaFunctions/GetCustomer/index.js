const https = require('https');
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
const appsyncUrl = process.env.API_URL;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const queries = require('./queries.js');

exports.handler = async (event) => {
    const req = new AWS.HttpRequest(appsyncUrl, region);
    
    let graphqlQuery, opName, payload;
    
    if (event.byID) {
        graphqlQuery = queries.customerByID;
        opName = "getCustomer";
        payload = {
            id: event.customerID
        };
        
    } else if (event.byPhoneNumber) {
        graphqlQuery = queries.customerByPhoneNumber;
        opName = "customerByPhoneNumber";
        payload = {
            phoneNumber: event.customerPhoneNumber
        };
        
    } else if (event.bySubscriptionExpiration) {
        graphqlQuery = queries.customerBySubscriptionExpiration;
        opName = "customerBySubscriptionExpiration";
        payload = {
            subscriptionExpiration: event.subscriptionExpiration
        };
        
    } else if (event.byMonthlySubscriptionCode) {
        graphqlQuery = queries.customerByMonthlySubscriptionCode;
        opName = "customerByMonthlySubscriptionCode";
        payload = {
            monthlySubscriptionCode: event.monthlySubscriptionCode
        };
        
    } else if (event.all) {
        graphqlQuery = queries.listCustomers;
        opName = "listCustomers";
        payload = {};

    } else if (event.bySite) {
        graphqlQuery = queries.customerBySite;
        opName = "customerBySite";
        payload = {
            siteID: event.siteID
        };

    }

    req.method = "POST";
    req.path = "/graphql";
    req.headers.host = endpoint;
    req.headers["Content-Type"] = "application/json";
    req.body = JSON.stringify({
        query: graphqlQuery,
        operationName: opName,
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
    
    if (event.byID) {
        return data.data.getCustomer;
        
    } else if (event.byPhoneNumber) {
        return data.data.customerByPhoneNumber.items[0];
        
    } else if (event.bySubscriptionExpiration) {
        return data.data.customerBySubscriptionExpiration.items;
        
    } else if (event.byMonthlySubscriptionCode) {
        return data.data.customerByMonthlySubscriptionCode.items[0];

    } else if (event.all) {
        return data.data.listCustomers.items;
        
    } else if (event.bySite) {
        return data.data.customerBySite.items;
        
    }

};