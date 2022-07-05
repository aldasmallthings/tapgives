const AWS = require('aws-sdk');
AWS.config.region = process.env.REGION;
const lambda = new AWS.Lambda();

async function invokeGetSiteManager(getSiteManagerInput) {

    const lambdaPayload = JSON.stringify(getSiteManagerInput);
    
    const params = {
        FunctionName: process.env.GET_SITE_MANAGER_FUNCTION_NAME,
        InvocationType: 'RequestResponse',
        LogType: 'Tail',
        Payload: lambdaPayload
    };
    
    try {
        let res = await lambda.invoke(params).promise();
        let siteManager = JSON.parse(res.Payload);
        
        console.log("SITE MANAGER AND SITES (SITE IDS):");
        console.log(siteManager);
        return siteManager;
    } catch (err) {
        console.log(err);
        console.log("Error getting site manager.");
        return null;
    }
}

module.exports = invokeGetSiteManager; 