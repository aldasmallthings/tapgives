const AWS = require('aws-sdk');
AWS.config.region = process.env.REGION;
const lambda = new AWS.Lambda();

async function invokeRecordCustomerTransaction(recordTransactionInput) {
    const lambdaPayload = JSON.stringify(recordTransactionInput);
    
    const params = {
        FunctionName: process.env.RECORD_CUSTOMER_TRANSACTION_FUNCTION_NAME,
        InvocationType: 'RequestResponse',
        LogType: 'Tail',
        Payload: lambdaPayload
    };
    
    try {
        let res = await lambda.invoke(params).promise();
        let recordTransactionResponse = JSON.parse(res.Payload);

        if (recordTransactionResponse.isTransactionRecorded) {
            console.log("Transaction successfully recorded!");
        } else {
            console.log("Unsuccessful recording of transaction.");
        }
        
    } catch (err) {
        console.log(err);
        console.log("Error recording transaction.");
    }
}

module.exports = invokeRecordCustomerTransaction; 