const UssdMenu = require("ussd-menu-builder");
const invokeMpesaPaymentStepFunction = require('./../lambdas/invokeMpesaPaymentStepFunction');

const SUBSCRIPTION_VALID = process.env.SUBSCRIPTION_VALID;
const SUBSCRIPTION_INVALID = process.env.SUBSCRIPTION_INVALID;

async function runCustomerMenu(args, context, customer, languageSet) {
    const menu = new UssdMenu();
    const languagePhrases = languageSet[customer.preferredLanguage];


    let startMenu = () => {
        return {
            run: () => {
                menu.con(languagePhrases.welcomeBack + customer.firstName + 
                languagePhrases.pinPrompt);
            },
            next: {
                "*^[0-9]{4}$": "validate-pin"
            }
        };
    };
    
    
    menu.state("validate-pin", {
        run: () => {
            let givenPin = Number(menu.val);
            
            if (givenPin === customer.pin) {
                console.log("CORRECT PIN");
                
                menu.con(languagePhrases.customerOptions);
                
            } else {
                menu.end(languagePhrases.incorrectPin);
            }
                
        },
        next: {
            "1": "show-subscription",
            "2": "purchase-subscription",
            "3": "show-jerrycan-balance",
            "0": "exit"
        }
    });
    
    menu.state("show-subscription", {
        run: () => {
            menu.end(languagePhrases.showSubscription + 
            String(customer.monthlySubscriptionCode) + ".\n" + 
            languagePhrases.exit);
        }
    });
    
    menu.state("show-jerrycan-balance", {
        run: () => {
            menu.end(languagePhrases.showJerrycanBalance + 
            String(customer.jerrycansAllowed) + ".\n" + 
            languagePhrases.exit);
        }
    });
    
    menu.state("purchase-subscription", {
        run: () => {
            if (customer.validSubscription === SUBSCRIPTION_VALID) {
                menu.end(languagePhrases.invalidSelectionInPurchaseSubscription);
                
            } else if (customer.validSubscription === SUBSCRIPTION_INVALID) {
                menu.con(languagePhrases.purchaseSubscriptionConfirmationPt1 + 
                    String(customer.site.subscriptionFee) +
                    languagePhrases.purchaseSubscriptionConfirmationPt2);
                
            }
        }, 
        next: {
            "1": "start-mpesa",
            "0": "exit"
        }
    });
    
    menu.state("start-mpesa", {
        run: async () => {
            await invokeMpesaPaymentStepFunction(customer);

            menu.end(languagePhrases.paymentPrompt);
        }
    });
    
    ///////////// EXIT ////////////
    menu.state("exit", {
        run: () => {
            menu.end(languagePhrases.exit);
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

module.exports = runCustomerMenu;