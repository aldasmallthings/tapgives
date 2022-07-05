export const basePhrases  = {
    en:{
        signIn:"Sign In",
        email:"Email",
        password:"Password",
        forgot:"Forgot your password?",
        forgotQuery:"Enter your email address and we'll send you a code to help you reset your password.",
        reset:"Send reset code",
        back:"Back",
        createAccount:"Create an account",
        uppercase: 'At least one uppercase letter' ,
        lowercase: 'At least one lowercase letter' ,
        digit: 'At least one digit' ,
        special: 'At least one special character' ,
        minLength: 'Should be more than 8 characters' ,
        maxLength: 'Should be less than 16 characters',
        enterValidEmail: "Please enter a valid email or create an account",
        enterReset:"Enter received code",
        checkEmail:"Please check your email",
        forCode:"for a reset code and create a new password.",
        verificationError:"Please enter correct reset code.",
        createPassword:"Create new password",
        reenter:"Re-enter the password",
        noMatch:"Passwords do not match",
        helperText:"Your password must have the following:",
        firstName:"First Name",
        lastName:"Last Name",
        phoneNumber: "Phone number",
        passwordRequirements: "Your password must have the following:",
        confirmPassword: "Confirm Password",
        signUp: "Sign Up",
        verifyAccount: "Verify Account",
        emailCheck: "Please check your email for a confirmation code. This may take several minutes.",
        invalidCode: "Invalid verification code provided, please try again.",
        newCode: "New verification code sent successfully.",
        noCode: "Didn't receive your verification code?",
        resend: "Resend Code",
        verify: "Verify",
        enterPassword: "Enter new password",
        setPassword: "Set Password",
        accountExists: "An account with the given email already exists.",
        validEmail: "Please enter a valid email.",
        passwordReset: "Password Reset",
        setNewPassword: "Set New Password",
        siteOwnership: "Change site ownership permissions by Site Manager",
        updateSitesManaged: "Update sites managed",
        createNewSite: "Create new site",
        editSelectedSite: "Edit selected sites",
        deleteSelectedSites: "Delete selected sites",
        createNewSiteDialog: "To create a new Site, enter the relevant details and press create",
        editSiteDialog: "To edit this site, fill in the details and press Edit",
        create: "Create",
        cancel: "Cancel",
        deleteSiteWarning: "WARNING: This will delete all associated customers and site managers",
        name: "Name",
        serviceRadius: "Radius (Km)",
        latitude: "Latitude",
        longitude: "Longitude",
        description: "Description",
        cognitoID: "Cognito ID",
        givenName: "Given Name",
        familyName: "Family Name",
        siteName: "Site name",
        siteDescription: "Site Description",
        smsDescription: "SMS description",
        avgWaitMinute: "Average Wait time (minutes)",
        avgLineCount: "Average line length",
        estimatedDaily: "Daily Total Usage (L)",
        subscriptionFee: "Subscription Fee",
        expectedJerrycans: "Expected Jerrycans",
        nickname: "Nickname",
        updatePassword: "Update Password",
        verificationCode: "Didn't receive your verification code?",
        resendCode: "Resend Code",
        or: "or",
        siteID: "Site ID",
        customerID: "Customer ID",
        languageCode: "Language code",
        languageName: "Language Name",
        addNewLanguage: "Add new language",
        syncLanguageToCloud: "Sync Language to Cloud",
        addLanguageTemplate: "Add new language template (does not upload until you finish submit phrases)",
        english: "English Phrase",
        translation: "Translated Phrase",
        deleteLanguageTemplate: "Delete selected language?",
        add: "Add",
        delete: "Delete",
        language: "Language",
        sites: "Sites",
        siteInformation: "Site Information",
        recentVisits: "Recent Visits",
        action: "Action",
        collectedItemType: "Collected Item Type",
        collectedItemCount: "Collected Item Count",
        hour: "Hour",
        visits: "Visits",
        year: "Year",
        month: "Month",
        day: "Day",
        subscriptionExpiration: "Subscription Expiration",
        subscriptionStatus: "Subscription status",
        pin: "view",
        queryHistory: "Query History",
        jerrycansAllowed: "Jerrycans Allowed",
        phraseCode: "Phrase Code",
        status: "Status",
        query: "Query",
        search: "Search",
        scan: "Scan",
        getMoreResults: "Get More Results",
        addFilter: "Add Filter",
        remove: "Remove",
        property: "Property",
        value: "Value",
        monthlySubscriptionCode: "Monthly Code",
        visitors: "Visitors",
        noInformation: "No Information",
        yearAndMonth: "Year and Month",
        fullName: "Full Name",
        home: "Home",
        siteCustomers: "Site Customers",
        administration: "Administration",
        languageAdministration: "Language Administration",
        broadcastMessage: "Broadcast Message",
        broadcastContent: "Broadcast Content",
        broadcastMessageDescription: "This will cause a message broadcast to all users of all selected sites, potentially with a high cost.",
        changeDefault: "Set Default Localization",
        changeDefaultMenu: "Are you sure you want to set default localization? (Will override any existing localization, so be careful with this)",
        confirm: "Confirm",

        ////////////////////// MENU LAMBDA /////////////////////
        startRegistration: "Welcome to TapGives!" +
            "\n Karibu TapGives!" +
            "\n———" +
            "\n Select a language: " +
            "\n Chagua lugha: " +
            "\n1. English" +
            "\n2. Swahili" +
            "\n0. Exit",
        multilingualExit: "Thank you. Goodbye." +
            "\nAsante. Kwaheri.",
        exit: "Thank you. Goodbye.",
        /* unknown customer menu*/
        actionSelection: "Select an action:" +
            "\n1.Register" +
            "\n2.Change phone number" +
            "\n0.Exit",
        // registration
        firstNamePrompt: "Enter your first name:",
        lastNamePrompt: "Enter your last name:",
        registrationPinPrompt: "Enter a 4 digit pin:",
        siteNicknamePrompt: "Enter your site nickname:",
        registrationError: "There has been a problem registering you. " +
            "Please try again. Thank you.",
        registrationConfirmation: "You have now been registered to the Tapgives project! " +
            "Rejoin the menu to purchase a subscription. Thank you.",
        invalidSiteNickname: "No site matches the provided nickname." +
            "\nPlease confirm the site nickname and retry. Thank you.",

        // change number
        oldPhoneNumberPrompt: "Enter your old phone number in +254 format:",
        oldPinPrompt: "Enter your old pin:",
        accountUpdated: "Your account has been updated. The phone number currently " +
            "in use is your new number. Thank you.",
        invalidCombination: "Invalid phoneNumber - pin combination.",
        /* known customer menu */
        welcomeBack: "Welcome back, ",
        pinPrompt: "! Please enter your PIN to proceed:",
        customerOptions: "Please select an option:" +
            "\n1.Show subscription code." +
            "\n2.Purchase subscription." +
            "\n3.Show jerrycan balance for the month." +
            "\n0.Exit",
        incorrectPin: "Incorrect PIN. Please try again.",
        showSubscription: "Your monthly subscription code is: ",
        showJerrycanBalance: "You have the following number of jerrycans remaining for the month: ",
        invalidSelectionInPurchaseSubscription: "Invalid selection. Subscription is already valid.",
        purchaseSubscriptionConfirmationPt1: "Press 1 to proceed with the transaction of ",
        purchaseSubscriptionConfirmationPt2: " shillings for a monthly subscription." + "\nPress 0 to exit.",
        paymentPrompt: "Please proceed to pay for the subscription. " +
            "You will receive a notification shortly afterwards. Thank you.",
        /* site manager menu */
        siteManagerOptions: "Welcome site manager. Please select an option:" +
            "\n1.Verify customer subscription" +
            "\n0.Exit",
        customerCodePrompt: "Enter the customer's subscription code: ",
        notAuthorized: "You are not authorized to validate this customer.",
        customerSubscriptionInvalid: "The customer's subscription is invalid.",
        noJerrycansLeft: "The customer has used up all allowed jerrycans.",
        validCustomerOptionsPt1: "This customer is allowed to collect the following number of jerrycans: ",
        validCustomerOptionsPt2: "\nSelect an option:" +
            "\n1.Validate 1 collection." +
            "\n0.Exit",
        collectionConfirmation: "The customer is now allowed to take 1 jerrycan of water. Thank you.",
        ////// SEND SUBSCRIPTION MESSAGES LAMBDA //////
        subscriptionSuccessMessage: "Dear customer, you have successfully purchased a monthly " +
            "subscription to the TapGives project. Start the menu to see your updated account.",
        subscriptionFailureMessage: "Dear customer, there has been a problem in subscribing you. " +
            "If you have not yet paid for the subscription, please retry.",
        reminderMessage:"Dear customer, you have two days until your subscription expires. " +
            "Make sure you purchase a subscription when it does!",
        unsubscriptionMessage: "Dear customer, your subscription has expired. " +
            "Start the menu to purchase a new subscription!",

    },
    sw: {
        signIn:"Weka sahihi ",
        email:"Barua pepe",
        password:"Nenosiri",
        forgot:"Umesahau nenosiri yako?",
        forgotQuery:"Weka barua pepe yako na tutakutumia msimbo ili kukusaidia kuweka upya nenosiri lako.",
        reset:"Tuma msimbo wa kuweka upya",
        back:"Nyuma",
        createAccount:"Fungua akaunti",
        uppercase: 'Angalau herufi kubwa moja' ,
        lowercase: 'Angalau herufi ndogo moja' ,
        digit: 'Angalau tarakimu moja' ,
        special: 'Angalau mhusika mmoja maalum' ,
        minLength: 'Inapaswa kuwa zaidi ya herufi 8' ,
        maxLength: 'Inapaswa kuwa chini ya herufi 16',
        enterValidEmail: "Tafadhali ingiza barua pepe halali au ufungue akaunti",
        enterReset:"Weka msimbo uliopokelewa",
        checkEmail:"Tafadhali angalia barua pepe yako ",
        forCode:"kwa msimbo wa kuweka upya na unda nenosiri mpya.",
        verificationError:"Tafadhali weka msimbo sahihi wa kuweka upya.",
        createPassword:"Unda nenosiri mpya",
        reenter:"Ingiza tena nenosiri",
        noMatch:"Manenosiri hayalingani",
        helperText:"Nenosiri lako lazima liwe na yafuatayo:",
        firstName:"Jina la kwanza",
        lastName:"Jina la familia",
        phoneNumber: "Nambari ya simu",
        passwordRequirements: "Nenosiri lako lazima liwe na yafuatayo:",
        confirmPassword: "Thibitisha Nenosiri",
        signUp: "Jisajili",
        verifyAccount: "Thibitisha Akaunti",
        emailCheck: "Tafadhali angalia barua pepe yako kwa nambari ya kuthibitisha. Hii inaweza kuchukua dakika kadhaa.",
        invalidCode: "Nambari ya kuthibitisha imetolewa, tafadhali jaribu tena.",
        newCode: "Nambari mpya ya uthibitishaji imetumwa kwa mafanikio.",
        noCode: "Hukupokea nambari yako ya kuthibitisha?",
        resend: "Tuma tena Msimbo",
        verify: "Thibitisha",
        enterPassword: "Weka nenosiri jipya",
        setPassword: "Weka Nenosiri",
        accountExists: "Akaunti iliyo na barua pepe uliyopewa tayari ipo.",
        validEmail: "Tafadhali weka barua pepe halali.",
        passwordReset: "Weka Upya Nenosiri",
        setNewPassword: "Weka Nenosiri Jipya",
        siteOwnership: "Badilisha ruhusa za umiliki wa tovuti na Msimamizi wa Tovuti",
        updateSitesManaged: "Sasisha tovuti zinadhibitiwa",
        createNewSite: "Unda tovuti mpya",
        editSelectedSite: "Unda tovuti mpya",
        deleteSelectedSites: "Futa tovuti zilizochaguliwa",
        createNewSiteDialog: "Ili kuunda Tovuti mpya, weka maelezo muhimu na ubonyeze unda",
        editSiteDialog: "Ili kuhariri tovuti hii, jaza maelezo na ubonyeze Hariri",
        create: "Unda",
        cancel: "Ghairi",
        deleteSiteWarning: "ONYO: Hii itafuta wateja wote wanaohusishwa na wasimamizi wa tovuti",
        name: "Jina",
        serviceRadius: "Kipenyo (Km)",
        latitude: "Latitudo",
        longitude: "Longitude",
        description: "Maelezo",
        cognitoID: "Cognito ID",
        givenName: "Jina Lililopewa",
        familyName: "Jina la ukoo",
        siteName: "Jina la tovuti",
        siteDescription: "Maelezo ya Tovuti",
        smsDescription: "Maelezo ya sms",
        avgWaitMinute: "Muda wa wastani wa Kusubiri (dakika)",
        avgLineCount: "Urefu wa wastani wa mstari",
        estimatedDaily: "Jumla ya Matumizi ya Kila Siku (L)",
        subscriptionFee: "Ada ya Usajili",
        expectedJerrycans: "Wanaotarajiwa wa Jerrycans",
        nickname: "Jina la utani",
        updatePassword: "Sasisha Nenosiri",
        verificationCode: "Hukupokea nambari yako ya kuthibitisha?",
        resendCode: "Tuma tena Msimbo",
        or: "au",
        siteID: "Kitambulisho cha tovuti",
        customerID: "Kitambulisho cha Mteja",
        languageCode: "Msimbo wa lugha",
        languageName: "Jina la Lugha",
        addNewLanguage: "Ongeza lugha mpya",
        syncLanguageToCloud: "Sawazisha Lugha kwa Wingu",
        addLanguageTemplate: "Ongeza kiolezo cha lugha mpya (haipakii hadi umalize kuwasilisha misemo)",
        english: "Neno la Kiingereza",
        translation: "Neno lililotafsiriwa",
        deleteLanguageTemplate: "Je, ungependa kufuta lugha uliyochagua?",
        add: "Ongeza",
        delete: "Futa",
        language: "Lugha",
        sites: "Maeneo",
        siteInformation: "Habari za Tovuti",
        recentVisits: "Ziara za Hivi Karibuni",
        action: "Kitendo",
        collectedItemType: "Aina ya Kipengee Kilichokusanywa",
        collectedItemCount: "Hesabu ya Bidhaa Zilizokusanywa",
        hour: "Saa",
        visits: "Ziara",
        year: "Mwaka",
        month: "Mwezi",
        day: "Siku",
        subscriptionExpiration: "Kuisha kwa Usajili",
        subscriptionStatus: "Hali ya usajili",
        pin: "mtazamo",
        queryHistory: "Historia ya Maswali",
        jerrycansAllowed: "Makopo ya Jerry Yanaruhusiwa",
        phraseCode: "Kanuni ya Maneno",
        status: "Hali",
        query: "Hoja",
        search: "Tafuta",
        scan: "Changanua",
        getMoreResults: "Pata Matokeo Zaidi",
        addFilter: "Ongeza Kichujio",
        remove: "Ondoa",
        property: "Mali",
        value: "Thamani",
        monthlySubscriptionCode: "Kanuni ya Kila Mwezi",
        visitors: "Wageni",
        noInformation: "Hakuna Taarifa",
        yearAndMonth: "Mwaka na Mwezi",
        fullName: "Jina kamili",
        home: "Nyumbani",
        siteCustomers: "Wateja wa Tovuti",
        administration: "Utawala",
        languageAdministration: "Utawala wa Lugha",
        broadcastMessage: "Bangaza Ujumbe",
        broadcastContent: "Maudhui ya Tangazo",
        broadcastMessageDescription: "Hii itasababisha utangazaji wa ujumbe kwa watumiaji wote wa tovuti zote zilizochaguliwa, uwezekano wa gharama kubwa.",
        changeDefault: "Weka Ujanibishaji Chaguomsingi",
        changeDefaultMenu: "Je, una uhakika unataka kuweka ujanibishaji chaguomsingi? (Itabatilisha ujanibishaji wowote uliopo, kwa hivyo kuwa mwangalifu na hii)",
        confirm: "Thibitisha",

        ////////////////////// MENU LAMBDA /////////////////////
        startRegistration: "Welcome to TapGives!" +
            "\n Karibu TapGives!" +
            "\n———" +
            "\n Select a language: " +
            "\n Chagua lugha: " +
            "\n1. English" +
            "\n2. Swahili" +
            "\n0. Exit",
        multilingualExit: "Thank you. Goodbye." +
            "\nAsante. Kwaheri.",
        exit: "Asante. Kwaheri.",
        /* unknown customer menu*/
        actionSelection: "Chagua kitendo:" +
            "\n1.Jiandikishe" +
            "\n2.Badilisha nambari ya simu" +
            "\n0.Toka",
        // registration
        firstNamePrompt: "Ingiza jina lako la kwanza:",
        lastNamePrompt: "Ingiza jina lako la mwisho:",
        registrationPinPrompt: "Ingiza PIN yenye tarakimu 4:",
        siteNicknamePrompt: "Ingiza jina la utani la tovuti yako:",
        registrationError: "Kumekuwa na tatizo katika kukusajili. " +
            "Tafadhali jaribu tena. Asante.",
        registrationConfirmation: "Sasa umeandikishwa kwa mradi wa Tapgives! " +
            "Anzisha menyu ili ununue usajili. Asante.",
        invalidSiteNickname: "Hakuna tovuti inayolingana na lakabu iliyotolewa." +
            "\nTafadhali thibitisha jina la utani la tovuti na ujaribu tena. Asante.",

        // change number
        oldPhoneNumberPrompt: "Weka nambari yako ya simu ya zamani katika umbizo la +254:",
        oldPinPrompt: "Weka pin yako ya zamani:",
        accountUpdated: "Akaunti yako imesasishwa. Nambari ya simu kwa sasa " +
            "inatumika ni nambari yako mpya. Asante.",
        invalidCombination: "Nambari ya simu na mseto wa pini ni batili.",
        /* known customer menu */
        welcomeBack: "Karibu tena, ",
        pinPrompt: "! Tafadhali ingiza PIN yako ili kuendelea:",
        customerOptions: "Tafadhali chagua:" +
            "\n1.Onyesha nambari ya usajili." +
            "\n2.Nunua usajili." +
            "\n3.Onyesha salio la jerrycan kwa mwezi." +
            "\n0.Toka",
        incorrectPin: "PIN mbaya. Tafadhali jaribu tena.",
        showSubscription: "Msimbo wako wa usajili wa kila mwezi ni: ",
        showJerrycanBalance: "Una nambari ifuatayo ya mikebe iliyosalia kwa mwezi: ",
        invalidSelectionInPurchaseSubscription: "Uchaguzi batili. Usajili tayari ni halali.",
        purchaseSubscriptionConfirmationPt1: "Bonyeza 1 ili kuendelea na shughuli ya ",
        purchaseSubscriptionConfirmationPt2: " shilingi kwa usajili wa kila mwezi." +
            "\nBonyeza 0 ili kuondoka.",
        paymentPrompt: "Tafadhali endelea kulipia usajili. " +
            "Utapokea arifa muda mfupi baadaye. Asante.",
        /* site manager menu */
        siteManagerOptions: "Karibu msimamizi wa tovuti. Tafadhali chagua:" +
            "\n1.Thibitisha usajili wa mteja" +
            "\n0.Toka",
        customerCodePrompt: "Ingiza nambari ya usajili ya mteja: ",
        notAuthorized: "Hujaidhinishwa kuthibitisha mteja huyu.",
        customerSubscriptionInvalid: "Usajili wa mteja ni batili.",
        noJerrycansLeft: "Mteja ametumia jeri zote zinazoruhusiwa.",
        validCustomerOptionsPt1: "Mteja huyu anaruhusiwa kukusanya idadi ifuatayo ya makopo ya jeri: ",
        validCustomerOptionsPt2: "\nChagua chaguo:" +
            "\n1.Thibitisha mkusanyiko mmoja." +
            "\n0.Toka",
        collectionConfirmation: "Mteja sasa anaruhusiwa kuchukua jeri moja ya maji. Asante.",
        ////// SEND SUBSCRIPTION MESSAGES LAMBDA //////
        subscriptionSuccessMessage: "Mpendwa mteja, umefaulu kununua usajili " +
            "kwa mradi wa TapGives. Anzisha menyu ili kuona akaunti yako iliyosasishwa.",
        subscriptionFailureMessage: "Mpendwa mteja, kumekuwa na tatizo katika kukusajili. " +
            "Ikiwa bado hujalipia usajili, tafadhali jaribu tena.",
        reminderMessage:"Mpendwa mteja, una siku mbili hadi muda wa usajili wako ukamilike. " +
            "Hakikisha kununua usajili baadaye!",
        unsubscriptionMessage: "Mpendwa mteja, muda wa usajili wako umeisha. " +
            "Anzisha menyu ili ununue usajili mpya!",

    }
}
export const baseLanguages = [
    {id: "en", language: "English"},
    {id: "sw", language: "Swahili"},
]