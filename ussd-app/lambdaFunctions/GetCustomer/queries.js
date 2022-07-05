module.exports = {
    customerByPhoneNumber: `query customerByPhoneNumber($phoneNumber: String!) {
        customerByPhoneNumber(phoneNumber: $phoneNumber) {
            items {
            	id
            	siteID
            	validSubscription
            	pin
            	phoneNumber
            	firstName
            	lastName
            	preferredLanguage
            	subscriptionExpiration
            	monthlySubscriptionCode
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
    }
    `,
    customerByID: `query getCustomer($id: ID!) {
        getCustomer(id: $id) {
        firstName
        id
        lastName
        phoneNumber
        pin
        preferredLanguage
        siteID
        subscriptionExpiration
        monthlySubscriptionCode
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
        validSubscription
        }
    }
    `,
    customerBySubscriptionExpiration: `query customerBySubscriptionExpiration($subscriptionExpiration: String!) {
        customerBySubscriptionExpiration(subscriptionExpiration: $subscriptionExpiration) {
            items {
                firstName
                id
                lastName
                phoneNumber
                preferredLanguage
                siteID
                subscriptionExpiration
                monthlySubscriptionCode
                validSubscription
                jerrycansAllowed
            }
        }
    }
    `,
    customerByMonthlySubscriptionCode: `query customerByMonthlySubscriptionCode($monthlySubscriptionCode: String!) {
        customerByMonthlySubscriptionCode(monthlySubscriptionCode: $monthlySubscriptionCode) {
            items {
                firstName
                id
                lastName
                monthlySubscriptionCode
                phoneNumber
                pin
                siteID
                subscriptionExpiration
                validSubscription
                preferredLanguage
                jerrycansAllowed
            }
        }
    }
    `,
    listCustomers: `query listCustomers {
        listCustomers {
            items {
                phoneNumber
            }
        }
    }
    `,
    customerBySite: `query customerBySite($siteID: ID!) {
        customerBySite(siteID: $siteID) {
            items {
                phoneNumber
            }
        }
    }
    `
};