const https = require('https');
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
const appsyncUrl = process.env.API_URL;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const graphqlQuery = require('./query.js').createCustomer;

exports.handler = async (event) => {
    const customerInput = event;
    console.log("CUSTOMER INPUT:");
    console.log(customerInput);
    
    const req = new AWS.HttpRequest(appsyncUrl, region);

    const payload = {
        createCustomerInput: customerInput
    };

    req.method = "POST";
    req.path = "/graphql";
    req.headers.host = endpoint;
    req.headers["Content-Type"] = "application/json";
    req.body = JSON.stringify({
        query: graphqlQuery,
        operationName: "createCustomer",
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
    
    console.log("CUSTOMER:");
    console.log(data.data.createCustomer);
    
    return data.data.createCustomer;
};