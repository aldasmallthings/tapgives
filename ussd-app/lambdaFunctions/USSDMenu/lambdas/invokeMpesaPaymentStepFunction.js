const aws = require('aws-sdk');

const SUBSCRIPTION = "subscription";

async function invokeMpesaPaymentStepFunction(customer) {
  const stepfunctions = new aws.StepFunctions();
  
  const params = {
    stateMachineArn: process.env.MPESA_PAYMENT_STEP_FUNCTION_ARN,
    input: JSON.stringify({
        action: SUBSCRIPTION,
        customerID: customer.id,
        customerPhoneNumber: customer.phoneNumber,
        subscriptionAmount: customer.site.subscriptionFee,
        preferredLanguage: customer.preferredLanguage,
        siteExpectedJerrycans: customer.site.expectedJerrycans
    })
  };
  
  let res = await stepfunctions.startExecution(params).promise();
  
  console.log("STEP FUNCTION RESPONSE: ");
  console.log(res);
  
  return;
}

module.exports = invokeMpesaPaymentStepFunction;