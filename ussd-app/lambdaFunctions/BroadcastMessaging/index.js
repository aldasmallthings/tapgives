const AWS = require('aws-sdk');
const pinpoint = new AWS.Pinpoint({region: process.env.REGION}); 

const invokeGetCustomers = require('./lambdas/invokeGetCustomers');
const invokeGetSiteManagers = require('./lambdas/invokeGetSiteManagers');

const projectId = process.env.PROJECT_ID;
const messageType = process.env.MESSAGE_TYPE;

// send message to:
// - all customers
// - customers by site id
// - all site managers
// - site managers by site id


exports.handler = async (event) => {
  console.log(event)

  let receivers;  // people receiving the message
  let {siteID, message} = event.arguments

  if (event.arguments.allCustomers) {
      let getCustomerInput = {
          all: true
      };
      receivers = await invokeGetCustomers(getCustomerInput);

  } else if (event.arguments.customersBySite) {
      let getCustomerInput = {
          bySite: true,
          siteID: siteID
      };
      receivers = await invokeGetCustomers(getCustomerInput);

  } else if (event.arguments.allSiteManagers) {
      let getSiteManagerInput = {
          all: true
      };
      receivers = await invokeGetSiteManagers(getSiteManagerInput);

  } else if (event.arguments.siteManagersBySite) {
      let getSiteManagerInput = {
          bySiteID: true,
          siteID: siteID
      };
      receivers = await invokeGetSiteManagers(getSiteManagerInput);

  }

  console.log("MESSAGE TO SEND: ");
  console.log(message);

  console.log("RECEIVER PHONE NUMBERS: ");
  console.log(receivers);
  

  let messagePromises = [];

  // send message to each receiver
  receivers.forEach((receiver) => {
      messagePromises.push(sendMessage(receiver.phoneNumber, message));
  });

  await Promise.all(messagePromises);

  // communicate whether all messages were successfully sent

  messagePromises.forEach((messageSuccess) => {
      if (!messageSuccess) {
          event['isMessagingSuccessful'] = false;
          return event;
      }
  });

  event['isMessagingSuccessful'] = true;
  return event;
};

async function sendMessage(destinationNum, msg) {
    const params = {
      ApplicationId: projectId,
      MessageRequest: {
        Addresses: {
          [destinationNum]: {
            ChannelType: 'SMS'
          }
        },
        MessageConfiguration: {
          SMSMessage: {
            Body: msg,
            MessageType: messageType
          }
        }
      }
    };
  
    try {
      let results = await pinpoint.sendMessages(params).promise();
      console.log("Message sent! " + 
        results['MessageResponse']['Result'][destinationNum]['StatusMessage']);
      return true;
    }
    catch (err) {
      console.log(err);
      return false;
    }
  }
