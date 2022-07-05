const AWS = require('aws-sdk');
AWS.config.region = process.env.REGION;
const lambda = new AWS.Lambda();

async function invokeGetSiteManagers(getSiteManagerInput) {

    const lambdaPayload = JSON.stringify(getSiteManagerInput);
    
    const params = {
        FunctionName: process.env.GET_SITE_MANAGER_FUNCTION_NAME,
        InvocationType: 'RequestResponse',
        LogType: 'Tail',
        Payload: lambdaPayload
    };
    
    try {
        let res = await lambda.invoke(params).promise();
        let siteManagers = JSON.parse(res.Payload);
        
        return siteManagers;

    } catch (err) {
        console.log(err);
        console.log("Error getting site manager.");
        return null;
    }
}

module.exports = invokeGetSiteManagers; 