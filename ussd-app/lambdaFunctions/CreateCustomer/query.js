module.exports = {
    createCustomer: `mutation createCustomer($createCustomerInput: CreateCustomerInput!) {
        createCustomer(input: $createCustomerInput) {
            firstName
            lastName
            phoneNumber
            pin
            preferredLanguage
            siteID
            subscriptionExpiration
            monthlySubscriptionCode
            validSubscription
            jerrycansAllowed
            site {
                avgLineCount
                avgWaitMinute
                description
                expectedJerrycans
                name
                nickname
                status
                subscriptionFee
                smsDescription
            }
        }
    }
    `
};