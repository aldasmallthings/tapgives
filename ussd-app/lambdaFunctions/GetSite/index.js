const https = require('https');
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
const appsyncUrl = process.env.API_URL;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const queries = require('./queries.js');

exports.handler = async (event) => {
    const req = new AWS.HttpRequest(appsyncUrl, region);

    let graphqlQuery, payload, opName;
    
    if (event.byID) {
        graphqlQuery = queries.getSiteByID;
        payload = {
            id: event.id
        };
        opName = "getSite";
        
    } else if (event.byNickname) {
        graphqlQuery = queries.getSiteByNickname;
        payload = {
            nickname: event.nickname
        };
        opName = "siteByNickname";
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
    
    let result;
    
    console.log("DATA: \n");
    console.log(data);

    if (event.byID) {
        result = data.data.getSite;
    } else if (event.byNickname) {
        console.log(data.data.siteByNickname);
        result = data.data.siteByNickname.items[0];
    }
    
    return result;
};