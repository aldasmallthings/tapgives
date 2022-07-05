const unirest = require('unirest');

/* variables */
const clientKey = process.env.CLIENT_KEY;
const clientSecret = process.env.CLIENT_SECRET;
const passKey = process.env.PASS_KEY;
const businessShortCode = process.env.BUSINESS_SHORTCODE;
const acctRef = process.env.ACCOUNT_REFERENCE;
const initiateURL = process.env.INITIATE_URL;
const accessTokenURL = process.env.ACCESS_TOKEN_URL;
const callbackURL = process.env.CALLBACK_URL;

let mpesaTimeStamp, mpesaPassword;
let customerPhoneNum, subscriptionAmount;

exports.handler = async (event) => {
    
    customerPhoneNum = Number(event.customerPhoneNumber);
    console.log("CUSTOMER PHONE NUM: " + customerPhoneNum);
    subscriptionAmount = Number(event.subscriptionAmount);
    
    generateMpesaTimeStamp();
    generateMpesaPassword();
    
    
    /* get access token */ 
    let accessTokenRes = await getAccessToken();
    if (accessTokenRes.error) {
        console.log("ACCESS TOKEN ERROR: ");
        console.log(accessTokenRes.body.errorMessage);
        return {
            ResultDesc: accessTokenRes.body.errorMessage,
            isSuccess: false
        };
    }
    let accessToken = accessTokenRes.body.access_token;
    console.log("ACCESS TOKEN: " + accessToken);
    

    /* initiate payment transaction */
    let initRes = await initiate(accessToken);
    if (initRes.error) {
        console.log("INITIATE ERROR: ");
        console.log(initRes.body.errorMessage);
        return {
            ResultDesc: initRes.body.errorMessage,
            isSuccess: false
        };
    }
    
    let initResBody = initRes.body;
    console.log("INITIATE RESPONSE BODY: ");
    console.log(initResBody);
    if (Number(initResBody.ResponseCode) !== 0) {
        return {
            ResultDesc: initResBody.ResponseDescription,
            isSuccess: false
        };
    }

    let checkoutReqID = String(initResBody.CheckoutRequestID);
    
    event['businessShortCode'] = businessShortCode;
    event['accessToken'] = accessToken;
    event['checkoutRequestID'] = checkoutReqID;
    event['mpesaPassword'] = mpesaPassword;
    event['mpesaTimeStamp'] = mpesaTimeStamp;
    event['isSuccess'] = true;
    
    return event;
};


async function getAccessToken() {
    /* define variables */
    let auth = Buffer.from(String(clientKey) + ":" + String(clientSecret)).toString('base64');
    
    /* get access token */
    let res = await unirest('GET', accessTokenURL).headers({ 'Authorization': 'Basic ' + auth }).send();
    
    return res;
}

async function initiate(access_token) {
    
    let res = await unirest.post(initiateURL)
    .headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(access_token)
    })
    .send(JSON.stringify({
        "BusinessShortCode": businessShortCode,
        "Password": mpesaPassword,
        "Timestamp": mpesaTimeStamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": subscriptionAmount,
        "PartyA": customerPhoneNum,
        "PartyB": businessShortCode,
        "PhoneNumber": customerPhoneNum,
        "CallBackURL": callbackURL,
        "AccountReference": acctRef,
        "TransactionDesc": "Payment of Subscription" 
    }));

    return res;
}

function generateMpesaPassword() {
    mpesaPassword = Buffer.from(String(businessShortCode) + passKey + mpesaTimeStamp).toString('base64');
}

function generateMpesaTimeStamp() {
    let fullDate = new Date().toISOString();
    let date = fullDate.substring(0,10).replace(/-/g, "");
    let time = fullDate.substring(11, 19).replace(/:/g, "");
    mpesaTimeStamp = date + time;
}


