const AWS = require('aws-sdk');
AWS.config.region = process.env.REGION;
const lambda = new AWS.Lambda();

async function invokeSendSubscriptionMessages(sendMessageInput) {
    const lambdaPayload = JSON.stringify(sendMessageInput);
    
    const params = {
        FunctionName: process.env.SEND_SUBSCRIPTION_MESSAGES_FUNCTION_NAME,
        InvocationType: 'RequestResponse',
        LogType: 'Tail',
        Payload: lambdaPayload
    };
    
    try {
        let res = await lambda.invoke(params).promise();
        let messageResponse = JSON.parse(res.Payload);
        
        if (messageResponse.isMessageSuccessful) {
            console.log("Message Successfully sent!");
        } else {
            console.log("Unsuccessful sending message");
        }
        
        return messageResponse.isMessageSuccessful;
        
    } catch (err) {
        console.log(err);
        console.log("Error sending message to customer.");
        
        return false;
    }
}

module.exports = invokeSendSubscriptionMessages; 