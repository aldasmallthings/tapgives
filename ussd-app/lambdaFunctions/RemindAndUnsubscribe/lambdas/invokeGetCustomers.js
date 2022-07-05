const AWS = require('aws-sdk');
AWS.config.region = process.env.REGION;
const lambda = new AWS.Lambda();

async function invokeGetCustomers(getCustomersInput) {
    const lambdaPayload = JSON.stringify(getCustomersInput);
    
    const params = {
        FunctionName: process.env.GET_CUSTOMER_FUNCTION_NAME,
        InvocationType: 'RequestResponse',
        LogType: 'Tail',
        Payload: lambdaPayload
    };
    
    try {
        let res = await lambda.invoke(params).promise();
        let customers = JSON.parse(res.Payload);
        return customers;
    } catch (err) {
        console.log(err);
        console.log("Error getting customer.");
    }
}

module.exports = invokeGetCustomers; 