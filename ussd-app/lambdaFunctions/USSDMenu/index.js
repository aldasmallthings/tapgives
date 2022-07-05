const AWS = require("aws-sdk");
const UssdMenu = require("ussd-menu-builder");

const invokeGetCustomer    = require('./lambdas/invokeGetCustomer');
const invokeGetSiteManager = require('./lambdas/invokeGetSiteManager');

const runCustomerMenu         = require('./customerMenus/runCustomerMenu');
const runSiteManagerMenu      = require('./siteManagerMenus/runSiteManagerMenu');
const runCustomerRegistration = require('./customerMenus/runCustomerRegistration');

const s3 = new AWS.S3();
const s3BucketName = process.env.S3_BUCKET_NAME;
const languagesFilePath = process.env.LANGUAGES_FILE_PATH;
const s3Params = {Bucket: s3BucketName, Key: languagesFilePath};

exports.handler = async (event, context) => {
    const menu = new UssdMenu();
    
    const langResp = await s3.getObject(s3Params).promise();
    const languageSet = JSON.parse(new Buffer.from(langResp.Body).toString("utf8"));
    
    let args = {
        phoneNumber: event.phoneNumber,
        sessionId: event.sessionId,
        serviceCode: event.serviceCode,
        text: event.text
    };
    console.log("Args: ");
    console.log(args);
    
    // check if user is a site manager first
    // if user is a site manager, route to site manager menu
    // if user is not: check if user is a known customer
    // if user is a known customer, route to customer menu
    // if not, route user to customer registration menu
    
    let routeUser = () => {
        return {
            run: async () => {

                /* see runSiteManagerMenu for 'siteManagerAndSites' shape */
                let getSiteManagerInput = {
                    byPhoneNumber: true,
                    phoneNumber: args.phoneNumber
                };
                let siteManagerAndSites = await invokeGetSiteManager(getSiteManagerInput);
                
                // if this is a site managers phone number, run the site manager menu
                if (siteManagerAndSites.length > 0) {
                    console.log("USER IS A SITE MANAGER; ROUTING TO SITE MANAGER MENU.");
                    runSiteManagerMenu(args, context, siteManagerAndSites, languageSet);
                    
                } else {
                    // run a customer menu depending on whether they're registered or not.
                    
                    let getCustomerInput = {
                        byPhoneNumber: true,
                        customerPhoneNumber: args.phoneNumber
                    };
                    let customer = await invokeGetCustomer(getCustomerInput);
                    
                    // if customer exists, run the customer menu
                    // otherwise, run the customer registration menu
                    if (customer) {
                        console.log("USER IS A KNOWN CUSTOMER; ROUTING TO CUSTOMER MENU.");
                        console.log(customer);
                        runCustomerMenu(args, context, customer, languageSet);
                        
                    } else {
                        console.log("USER IS AN UNKNOWN CUSTOMER; ROUTING TO CUSTOMER REGISTRATION");
                        runCustomerRegistration(args, context, languageSet);
                    }
                    
                }
                
            }
        };
    };
    
    
    //////          START MENU      /////////
    menu.startState(routeUser());
    let resMsg = await menu.run(args);
    
    //////        LOG RESPONSE      ////////
    console.log("RESPONSE");
    console.log(resMsg);
    
    //////        RETURN RESULT     ////////
    context.succeed(resMsg);
};