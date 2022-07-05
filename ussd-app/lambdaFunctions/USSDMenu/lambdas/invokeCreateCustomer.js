const AWS = require('aws-sdk');
AWS.config.region = process.env.REGION;
const lambda = new AWS.Lambda();

async function invokeCreateCustomer(createcustomerinput) {

    console.log("CREATE CUSTOMER INPUT")
    console.log(createcustomerinput)
    
    const lambdaPayload = JSON.stringify(createcustomerinput);

    const params = {
        FunctionName: process.env.CREATE_CUSTOMER_FUNCTION_NAME,
        InvocationType: 'RequestResponse',
        LogType: 'Tail',
        Payload: lambdaPayload
    };
    
    try {
        let res = await lambda.invoke(params).promise();
        let customer = JSON.parse(res.Payload);
        return customer;
    } catch (err) {
        console.log(err);
        console.log("Error creating customer.");
        return err;
    }
}

module.exports = invokeCreateCustomer;