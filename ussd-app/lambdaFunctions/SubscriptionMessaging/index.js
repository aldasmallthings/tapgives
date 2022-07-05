const AWS = require('aws-sdk');
const pinpoint = new AWS.Pinpoint({region: process.env.REGION}); 
const projectId = process.env.PROJECT_ID;
const messageType = process.env.MESSAGE_TYPE;

const s3BucketName = process.env.S3_BUCKET_NAME;
const languagesFilePath = process.env.LANGUAGES_FILE_PATH;
const s3 = new AWS.S3();
const s3Params = {Bucket: s3BucketName, Key: languagesFilePath};

/* actions */
const SUBSCRIPTION = process.env.SUBSCRIPTION; // mpesa step fn will use; converted below
const REMINDER_MESSAGE = process.env.REMINDER_MESSAGE;
const SUBSCRIPTION_MESSAGE = process.env.SUBSCRIPTION_MESSAGE;
const UNSUBSCRIPTION_MESSAGE = process.env.UNSUBSCRIPTION_MESSAGE;


exports.handler = async (event) => {
    console.log('Received event:', event);
    
    /* get language set from s3 */ 
    const langResp = await s3.getObject(s3Params).promise();
    const languageSet = JSON.parse(new Buffer.from(langResp.Body).toString("utf8"));
    
    // if the event action is 'subscription'
    // change it to 'subscription message'
    if (event.action === SUBSCRIPTION) {
      event['action'] = SUBSCRIPTION_MESSAGE;
    }
    
    let action = event.action;
    let customerPhoneNum = event.customerPhoneNumber;
    let preferredLanguage = event.preferredLanguage;
    
    let msg;
    if (action === SUBSCRIPTION_MESSAGE) {
      let isPaymentSuccessful = event.isSuccess;
      msg = isPaymentSuccessful? languageSet[preferredLanguage].subscriptionSuccessMessage:
        languageSet[preferredLanguage].subscriptionFailureMessage;
        
    } else if (action === UNSUBSCRIPTION_MESSAGE) {
      msg = languageSet[preferredLanguage].unsubscriptionMessage;
      
    } else if (action === REMINDER_MESSAGE) {
      msg = languageSet[preferredLanguage].reminderMessage;
    }
    
    console.log(action);
    console.log(customerPhoneNum);
    console.log(msg);
    
    let isMsgSuccessful = await sendMessage(customerPhoneNum, msg);
    
    event['isMessageSuccessful'] = isMsgSuccessful;
    return event;
};

async function sendMessage(givenDestNum, givenMessage) {
  const params = {
    ApplicationId: projectId,
    MessageRequest: {
      Addresses: {
        [givenDestNum]: {
          ChannelType: 'SMS'
        }
      },
      MessageConfiguration: {
        SMSMessage: {
          Body: givenMessage,
          MessageType: messageType
        }
      }
    }
  };

  try {
    let results = await pinpoint.sendMessages(params).promise();
    console.log("Message sent! " + 
      results['MessageResponse']['Result'][givenDestNum]['StatusMessage']);
    return true;
  }
  catch (err) {
    console.log(err);
    return false;
  }
}