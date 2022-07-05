const unirest = require('unirest');

/* variables */
const queryURL = process.env.QUERY_URL;

exports.handler = async (event) => {

    console.log("CHECKOUT REQ ID: " + event.checkoutRequestID);
    
    let res = await unirest('POST', String(queryURL))
    .headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(event.accessToken)
    })
    .send(JSON.stringify({
        "BusinessShortCode": event.businessShortCode,
        "Password": event.mpesaPassword,
        "Timestamp": event.mpesaTimeStamp,
        "CheckoutRequestID": event.checkoutRequestID
    }));

    if (!event.numChecks) {
        event['numChecks'] = 1;
    } else {
        event['numChecks'] = Number(event.numChecks) + 1;
    }
    
    console.log("CONFIRM PAYMENT RES : \n");
    console.log(res.body);

    if (res.error) {    // invalid request or Mpesa error
        console.log("ERROR: ");
        console.log(res.body.errorMessage);
        event["isSuccess"] = false;
        event["ResultDesc"] = res.body.errorMessage;
        
    } else {
        console.log("RESCODE: " + String(res.body.ResultCode));
        
        // success if resultCode = 0; false otherwise
        event["isSuccess"] = (Number(res.body.ResultCode) === 0);
        event["validSubscription"] = String(Number(res.body.ResultCode) === 0);
        event["updateSubscription"] = (Number(res.body.ResultCode) === 0);
        event["ResultDesc"] = res.body.ResultDesc;
    }
    
    return event;
};
  