const AWS = require('aws-sdk');
AWS.config.region = process.env.REGION;
const lambda = new AWS.Lambda();

async function invokeUpdateCustomer(updateCustomerInput) {
    const lambdaPayload = JSON.stringify(updateCustomerInput);
    
    const params = {
        FunctionName: process.env.UPDATE_CUSTOMER_FUNCTION_NAME,
        InvocationType: 'RequestResponse',
        LogType: 'Tail',
        Payload: lambdaPayload
    };
    
    try {
        let res = await lambda.invoke(params).promise();
        let updateResponse = JSON.parse(res.Payload);
        
        if(updateResponse.isUpdateSuccessful) {
            console.log("Successfully updated customer!");
        } else {
            console.log("Customer update unsuccessful.");
        }
        
        return updateResponse.isUpdateSuccessful;
        
    } catch (err) {
        console.log(err);
        console.log("Error getting customer.");
        
        return false;
    }
}

module.exports = invokeUpdateCustomer; 