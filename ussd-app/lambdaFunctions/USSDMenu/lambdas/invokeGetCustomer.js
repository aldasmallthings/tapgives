const AWS = require('aws-sdk');
AWS.config.region = process.env.REGION;
const lambda = new AWS.Lambda();

async function invokeGetCustomer(getCustomerInput) {
    const lambdaPayload = JSON.stringify(getCustomerInput);
    
    const params = {
        FunctionName: process.env.GET_CUSTOMER_FUNCTION_NAME,
        InvocationType: 'RequestResponse',
        LogType: 'Tail',
        Payload: lambdaPayload
    };
    
    try {
        let res = await lambda.invoke(params).promise();
        let user = JSON.parse(res.Payload);
        return user;
    } catch (err) {
        console.log(err);
        console.log("Error getting customer.");
    }
}

module.exports = invokeGetCustomer; 