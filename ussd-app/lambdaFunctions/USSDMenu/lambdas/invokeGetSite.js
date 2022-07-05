const AWS = require('aws-sdk');
AWS.config.region = process.env.REGION;
const lambda = new AWS.Lambda();

async function invokeGetCustomer(getSiteInput) {

    const lambdaPayload = JSON.stringify(getSiteInput);
    
    const params = {
        FunctionName: process.env.GET_SITE_FUNCTION_NAME,
        InvocationType: 'RequestResponse',
        LogType: 'Tail',
        Payload: lambdaPayload
    };
    
    try {
        let res = await lambda.invoke(params).promise();
        let site = JSON.parse(res.Payload);
        
        return site;
    } catch (err) {
        console.log(err);
        console.log("Error getting customer.");
        return null;
    }
}

module.exports = invokeGetCustomer; 