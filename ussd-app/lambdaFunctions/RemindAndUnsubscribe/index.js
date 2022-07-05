const invokeGetCustomers = require('./lambdas/invokeGetCustomers');
const invokeUpdateCustomer = require('./lambdas/invokeUpdateCustomer');
const invokeSendSubscriptionMessages = require('./lambdas/invokeSendSubscriptionMessages');
const invokeRecordCustomerTransaction = require('./lambdas/invokeRecordCustomerTransaction');

const daysAheadToRemind = Number(process.env.DAYS_AHEAD_TO_REMIND);

const SUBSCRIPTION_INVALID = process.env.SUBSCRIPTION_INVALID;

/* actions */
const UNSUBSCRIPTION_MESSAGE = process.env.UNSUBSCRIPTION_MESSAGE;
const REMINDER_MESSAGE = process.env.REMINDER_MESSAGE;
const UNSUBSCRIPTION = process.env.UNSUBSCRIPTION;

exports.handler = async (event) => {
    
    let date = new Date();
    
    // expiration date = today
    let expirationDate = date.toISOString().substring(0,10);
    
    // reminderExpirationDate = today + daysAheadToRemind
    date.setDate(date.getDate() + daysAheadToRemind);
    let reminderExpirationDate = date.toISOString().substring(0,10);
    
    console.log("EXPIRATION DATE: " + expirationDate);
    console.log("REMINDER EXPIRATION DATE: " + reminderExpirationDate);
    
    // get customers to be reminded and to be unsubscribed
    let getExpiredCustomersInput = {
        bySubscriptionExpiration: true,
        subscriptionExpiration: expirationDate
    };
    
    let getCustomerToRemindInput = {
        bySubscriptionExpiration: true,
        subscriptionExpiration: reminderExpirationDate
    };
    
    let getCustomersPromises = await Promise.all([invokeGetCustomers(getExpiredCustomersInput),
        invokeGetCustomers(getCustomerToRemindInput)]);
    
    let customersToBeUnsubscribed = getCustomersPromises[0];
    let customersToBeReminded = getCustomersPromises[1];
    
    console.log("CUSTOMERS TO BE REMINDED:");
    console.log(customersToBeReminded);
    
    console.log("CUSTOMERS TO BE UNSUBSCRIBED:");
    console.log(customersToBeUnsubscribed);
    
    
    // remind customers and record message transaction
    let reminderActions = remindAndRecord(customersToBeReminded);
    
    // unsubscribe customers, send message and record both transactions
    let unsubscriptionActions = messageUnsubscribeAndRecord(customersToBeUnsubscribed);
    
    let customerActionPromises = [reminderActions, unsubscriptionActions];
    
    await Promise.all(customerActionPromises);
    
    return;
};


async function remindAndRecord(customersToBeReminded) {
    let len = customersToBeReminded.length;
    
    let reminderMessageStatuses = [];  // promise array of message statuses
    let transactionRecording = []; // promise array
    
    // send reminder messages
    for (let i = 0; i < len; i++) {
        let customerToRemind = customersToBeReminded[i];
        
        let sendMessageInput = {
            action: REMINDER_MESSAGE,
            customerPhoneNumber: customerToRemind.phoneNumber,
            preferredLanguage: customerToRemind.preferredLanguage
        };
        reminderMessageStatuses.push(invokeSendSubscriptionMessages(sendMessageInput));
    }
    // wait for all messages to be sent
    await Promise.all(reminderMessageStatuses);
    
    // record statuses of reminder messages
    for (let i = 0; i < len; i++) {
        let remindedCustomer = customersToBeReminded[i];
        let isMessageSuccessful = reminderMessageStatuses[i];
        
        let transactionInput = {
            action: REMINDER_MESSAGE,
            customerID: remindedCustomer.id,
            isSuccess: isMessageSuccessful
        };
        transactionRecording.push(invokeRecordCustomerTransaction(transactionInput));
    }
    
    // wait for all transactions to be recorded
    await Promise.all(transactionRecording);
    
    return;
}


async function messageUnsubscribeAndRecord(customersToBeUnsubscribed) {
    let len = customersToBeUnsubscribed.length;

    let unsubscriptionMessageStatuses = [];  // promise array of message statuses
    let unsubscriptionStatuses = [];  // promise array of customer update statuses
    let transactionRecording = [];  // promise array
    
    // send unsubscription messages and unsubscribe
    for (let i = 0; i < len; i++) {
        let unsubscribeCustomer = customersToBeUnsubscribed[i];
        
        // send unsubscription message
        let sendMessageInput = {
            action: UNSUBSCRIPTION_MESSAGE,
            customerPhoneNumber: unsubscribeCustomer.phoneNumber,
            preferredLanguage: unsubscribeCustomer.preferredLanguage
        };
        unsubscriptionMessageStatuses.push(invokeSendSubscriptionMessages(sendMessageInput));
        
        // unsubscribe customer (update customer)
        let updateCustomerInput = {
            updateSubscription: true,
            customerID: unsubscribeCustomer.id,
            validSubscription: SUBSCRIPTION_INVALID
        };
        unsubscriptionStatuses.push(invokeUpdateCustomer(updateCustomerInput));
    }
    
    await Promise.all(unsubscriptionMessageStatuses);
    await Promise.all(unsubscriptionStatuses);
    
    // record customer transactions
    for (let i = 0; i < len; i++) {
        let customer = customersToBeUnsubscribed[i];
        let messageSuccess = unsubscriptionMessageStatuses[i];
        let unsubscriptionSuccess = unsubscriptionStatuses[i];
        
        // record unsubscription messages
        let messageTransactionInput = {
            action: UNSUBSCRIPTION_MESSAGE,
            customerID: customer.id,
            isSuccess: messageSuccess
        };
        transactionRecording.push(invokeRecordCustomerTransaction(messageTransactionInput));
            
        // record unsubscriptions
        let unsubscriptionTransactionInput = {
            action: UNSUBSCRIPTION,
            customerID: customer.id,
            isSuccess: unsubscriptionSuccess
        };
        transactionRecording.push(invokeRecordCustomerTransaction(unsubscriptionTransactionInput));
    }
    
    // wait for all transactions to be recorded
    await Promise.all(transactionRecording);
    
    return;
}
