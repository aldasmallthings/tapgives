module.exports = {
    updateSubscription: `mutation updateCustomer($updateCustomerInput: UpdateCustomerInput!) {
        updateCustomer(input: $updateCustomerInput) {
            id
            validSubscription
            subscriptionExpiration
            monthlySubscriptionCode
            jerrycansAllowed
        }
    }
    `,
    updatePhoneNumber: `mutation updateCustomer($updateCustomerInput: UpdateCustomerInput!) {
        updateCustomer(input: $updateCustomerInput) {
            id
            phoneNumber
        }
    }
    `,
    updateJerrycansAllowed: `mutation updateCustomer($updateCustomerInput: UpdateCustomerInput!) {
        updateCustomer(input: $updateCustomerInput) {
            id
            jerrycansAllowed
        }
    }
    `
};