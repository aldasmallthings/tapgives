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
        graphqlQuery = queries.siteManagerByID;
        opName = "siteManagerByID";
        payload = {
            id: event.id
        };
        
    } else if (event.bySiteID) {
        graphqlQuery = queries.siteManagerBySiteID;
        opName = "siteManagerBySite";
        payload = {
            siteID: event.siteID
        };
        
    } else if (event.byPhoneNumber) {
        graphqlQuery = queries.siteManagerByPhoneNumber;
        opName = "siteManagerByPhoneNumber";
        payload = {
            phoneNumber: event.phoneNumber
        };
        
    } else if (event.all) {
        graphqlQuery = queries.listSiteManagers;
        opName = "listSiteManagers";
        payload = {};
        
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
        console.log("SITE MANAGER AND THEIR SITES (SITE IDS):");
        console.log(data.data.siteManagerByID.items);
        
        return data.data.siteManagerByID.items;
        
    } else if (event.bySiteID) {
        console.log("SITE MANAGERS FOR SAME SITE:");
        console.log(data.data.siteManagerBySite.items);
        
        return data.data.siteManagerBySite.items;

    } else if (event.byPhoneNumber) {
        console.log("SITE MANAGER AND THEIR SITES (SITE IDS):");
        console.log(data.data.siteManagerByPhoneNumber.items);
        
        return data.data.siteManagerByPhoneNumber.items;

    } else if (event.all) {
        console.log("ALL SITE MANAGERS:");
        console.log(data.data.listSiteManagers.items);
        
        return data.data.listSiteManagers.items;
        
    }

};