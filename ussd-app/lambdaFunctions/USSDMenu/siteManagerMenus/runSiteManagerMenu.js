const UssdMenu = require("ussd-menu-builder");

const invokeGetCustomer = require('./../lambdas/invokeGetCustomer');
const invokeUpdateCustomer = require('./../lambdas/invokeUpdateCustomer');
const invokeRecordCustomerTransaction = require('./../lambdas/invokeRecordCustomerTransaction');

/* subscription types */
const VALID_SUBSCRIPTION = process.env.SUBSCRIPTION_VALID;
const INVALID_SUBSCRIPTION = process.env.SUBSCRIPTION_INVALID;

/* action */
const VISIT = process.env.VISIT;

/* amount */
const NO_JERRYCANS = Number(process.env.NONE);
const JERRYCANS_PER_TRIP = Number(process.env.JERRYCANS_PER_TRIP);

let customer; 

async function runSiteManagerMenu(args, context, siteManagerAndSites, languageSet) {
    const menu = new UssdMenu();
    const languagePhrases = languageSet[siteManagerAndSites[0].preferredLanguage];
    
    /* 
    IMPORTANT: below is an example of the shape of siteManagerAndSites
    
    [
        {
            "id": "656c270e-a77c-48b8-98e8-ab2bfd83b031",
            "phoneNumber": "+17783885382",
            "preferredLanguage": "en",
            "siteID": "45debe13-61eb-4a8a-a5ee-c472e3edbd53"
        },
        {
            "id": "656c270e-a77c-48b8-98e8-ab2bfd83b031",
            "phoneNumber": "+17783885382",
            "preferredLanguage": "en",
            "siteID": "ed5fd0f5-26bf-423c-b754-b8fb6e6d7d95"
        },
        {
            "id": "656c270e-a77c-48b8-98e8-ab2bfd83b031",
            "phoneNumber": "+17783885382",
            "preferredLanguage": "en",
            "siteID": "157dd0c2-4a22-42d8-becb-d206fcdc6092"
        }
    ]
    
    all entries contain the same site manager
    therefore, same id, phone number and preferred language
    
    what differs are the siteIDs, these are the different sites the 
    site manager manages
    
    */

    let startMenu = () => {
        return {
            run: () => {
                menu.con(languagePhrases.siteManagerOptions);
            },
            next: {
                "1": "customer-code",
                "0": "exit"
            }
        };
    };
    
    
    menu.state("customer-code", {
        run: () => {
            menu.con(languagePhrases.customerCodePrompt);
        },
        next: {
            "*^[A-Za-z0-9]{5}$": "verify-code"
        }
    });
    
    menu.state("verify-code", {
        run: async () => {
            let customerCode = menu.val;
            
            // modify all calls to getCustomer in all lambdas
            let getCustomerInput = {
                byMonthlySubscriptionCode: true,
                monthlySubscriptionCode: customerCode
            };
            customer = await invokeGetCustomer(getCustomerInput);
            console.log("CUSTOMER:");
            console.log(customer);
            
            let authorized = false;
            // if they both belong to the same site, then the site manager
            // can authorize collection, otherwise the manager cannot
            siteManagerAndSites.forEach((siteManAndSite) => {
                if (String(siteManAndSite.siteID) === String(customer.siteID)) {
                    authorized = true;
                }
            });
            
            console.log("SITE MANAGER AUTHORIZED FOR CUSTOMER: " + String(authorized));
            
            if (!authorized) {
                menu.end(languagePhrases.notAuthorized);
                
            } else if (customer.validSubsciption === INVALID_SUBSCRIPTION) {
                menu.end(languagePhrases.customerSubscriptionInvalid);
                
            } else if (customer.jerrycansAllowed <= NO_JERRYCANS) {
                menu.end(languagePhrases.noJerrycansLeft);
                
            } else if (customer.validSubscription === VALID_SUBSCRIPTION) {
                menu.con(languagePhrases.validCustomerOptionsPt1 + 
                String(customer.jerrycansAllowed) +
                languagePhrases.validCustomerOptionsPt2);
            }
        },
        next: {
            "1": "customer-collect",
            "0": "exit"
        }
    });
    
    menu.state("customer-collect", {
       run: async () => {
           // record transaction
           let recordTransactionInput = {
               action: VISIT,
               customerID: customer.id,
               isSuccess: true
           };
           await invokeRecordCustomerTransaction(recordTransactionInput);
           
           // decrement customer jerrycans allowed and update customer
           let updateCustomerInput = {
               updateJerrycansAllowed: true,
               customerID: customer.id,
               jerrycansAllowed: (customer.jerrycansAllowed - JERRYCANS_PER_TRIP)
           };
           await invokeUpdateCustomer(updateCustomerInput);
           
           menu.end(languagePhrases.collectionConfirmation);
       } 
    });
    
    
    ///////////// EXIT ////////////
    menu.state("exit", {
        run: () => {
            menu.end(languagePhrases.menu_exit);
        }
    });
    
    
    //////          START MENU      /////////
    menu.startState(startMenu());
    let resMsg = await menu.run(args);
    
    //////        LOG RESPONSE      ////////
    console.log("RESPONSE");
    console.log(resMsg);
    
    //////        RETURN RESULT     ////////
    context.succeed(resMsg);
}

module.exports = runSiteManagerMenu;