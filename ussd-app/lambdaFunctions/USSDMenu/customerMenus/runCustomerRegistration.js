const UssdMenu = require("ussd-menu-builder");
const invokeGetSite = require('./../lambdas/invokeGetSite');
const invokeGetCustomer = require('./../lambdas/invokeGetCustomer');
const invokeUpdateCustomer = require('./../lambdas/invokeUpdateCustomer');
const invokeCreateCustomer = require('./../lambdas/invokeCreateCustomer');

const ENGLISH = process.env.ENGLISH;
const SWAHILI = process.env.SWAHILI;
const defaultLanguage = ENGLISH;

const SUBSCRIPTION_INVALID = process.env.SUBSCRIPTION_INVALID;

const NO_JERRYCANS_AlLOWED = Number(process.env.NONE);
const NO_MONTHLY_SUBSCRIPTION_CODE = process.env.NA;

let firstName, lastName, signUpPin, siteNickname;
let oldPhoneNumber, oldPin;
let languagePhrases, preferredLanguage;
let customer;

async function runCustomerRegistration(args, context, languageSet) {
    const menu = new UssdMenu();

    let startRegistration = () => {
        return {
            run: () => {
                menu.con(languageSet[defaultLanguage].startRegistration);
            },
            next: {
                "*[1-2]": "action-selection",
                "0": "exit"
            }
        };
    };

    menu.state("action-selection", {
        run: () => {
            // set the preferred language
            let lang = Number(menu.val);
            if (lang === 1) {
                preferredLanguage = ENGLISH;
            } else if (lang === 2) {
                preferredLanguage = SWAHILI;
            }
            languagePhrases = languageSet[preferredLanguage];

            menu.con(languagePhrases.actionSelection);
        },
        next: {
            "1": "first-name",
            "2": "old-phoneNumber",
            "0": "exit"
        }
    });
    
    ///////////// REGISTER ////////////
    menu.state("first-name", {
        run: () => {
            menu.con(languagePhrases.firstNamePrompt);
        },
        next: {
            "*^[A-Z]?[a-z]{1,29}$": "last-name"
        }
    }); 
    
    menu.state("last-name", {
        run: () => {
            let inputFirst = menu.val;
            firstName = inputFirst.charAt(0).toUpperCase() + inputFirst.slice(1).toLowerCase();

            menu.con(languagePhrases.lastNamePrompt);
        },
        next: {
            "*^[A-Z]?[a-z]{1,29}$": "pin"
        }
    });
    
    menu.state("pin", {
        run: () => {
            let inputLast = menu.val;
            lastName = inputLast.charAt(0).toUpperCase() + inputLast.slice(1).toLowerCase();
            
            menu.con(languagePhrases.registrationPinPrompt);
        },
        next: {
            "*^[0-9]{4}$": "site-nickname"
        }
    });
    
    menu.state("site-nickname", {
        run: () => {
            signUpPin = Number(menu.val);
            menu.con(languagePhrases.siteNicknamePrompt);
        },
        next: {
            "*^[A-Z]?[a-z]{1,29}$": "complete-registration"
        }
    });

    menu.state("complete-registration", {
        run: async () => {
            siteNickname = String(menu.val).toUpperCase();
            
            // get site by nickname
            let getSiteInput = {
                byNickname: true,
                nickname: siteNickname
            };
            let site = await invokeGetSite(getSiteInput);
            
            console.log("CUSTOMER SITE: ");
            console.log(site);
            
            // if the site exists
            if (site !== undefined && site !== null) {
                // expiration date is today until they subscribe/pay
                let expirationDate = new Date().toISOString().substring(0,10);
                
                // add customer to the table
                const createcustomerinput = {
                    phoneNumber: args.phoneNumber,
                    validSubscription: SUBSCRIPTION_INVALID,
                    preferredLanguage: preferredLanguage,
                    firstName: firstName,
                    lastName: lastName,
                    pin: signUpPin,
                    siteID: site.id,
                    subscriptionExpiration: expirationDate,
                    monthlySubscriptionCode: NO_MONTHLY_SUBSCRIPTION_CODE,
                    jerrycansAllowed: NO_JERRYCANS_AlLOWED
                };
                customer = await invokeCreateCustomer(createcustomerinput);
                
                console.log("CUSTOMER REGISTERED:");
                console.log(customer);
                
                if (customer.errorMessage) {
                    menu.end(languagePhrases.registrationError);
                } else {
                    menu.end(languagePhrases.registrationConfirmation);
                }
                
                
            } else { // if site does not exist
                menu.end(languagePhrases.invalidSiteNickname);
            }
        }
    });

    ///////////// CHANGE NUMBER ///////////
    menu.state("old-phoneNumber", {
        run: () => {
            menu.con(languagePhrases.oldPhoneNumberPrompt);
        }, 
        next: {
            "*^(\\+\\d{1,3})\\d{8,10}$": "old-pin"
        }
    });
    
    menu.state("old-pin", {
        run: () => {
            oldPhoneNumber = menu.val;
        
            menu.con(languagePhrases.oldPinPrompt);
        }, 
        next: {
            "*^[0-9]{4}$": "check-user"
        }
    });
    
    menu.state("check-user", {
        run: async () => {
            oldPin = Number(menu.val);
            
            // query customer by phone number
            let getCustomerInput = {
                byPhoneNumber: true,
                customerPhoneNumber: oldPhoneNumber
            };
            let oldCustomer = await invokeGetCustomer(getCustomerInput);
            console.log("OLD CUSTOMER:");
            console.log(oldCustomer);
            
            if (oldCustomer && (oldCustomer.pin === oldPin)) {
                // update customer to have this new phone number
                let updateCustomerInput = {
                    updatePhoneNumber: true,
                    customerID: oldCustomer.id,
                    phoneNumber: args.phoneNumber
                };
                await invokeUpdateCustomer(updateCustomerInput);
                
                menu.end(languagePhrases.accountUpdated);
               
            } else {
                menu.end(languagePhrases.invalidCombination);
            }
        }
    });
    
    
    ///////////// EXIT ////////////
    menu.state("exit", {
        run: () => {
            if (!preferredLanguage) {
                menu.end(languagePhrases.multilingualExit);
            } else {
                menu.end(languagePhrases.exit);
            }
            
        }
    });
    
    
    //////          START MENU      /////////
    menu.startState(startRegistration());
    let resMsg = await menu.run(args);
    
    //////        LOG RESPONSE      ////////
    console.log("RESPONSE");
    console.log(resMsg);
    
    //////        RETURN RESULT     ////////
    context.succeed(resMsg);
}

module.exports = runCustomerRegistration;