module.exports = {
    createCustomerTransactions: `mutation createCustomerTransactions($createCustomerTransactionInput: CreateCustomerTransactionsInput!) {
        createCustomerTransactions(input: $createCustomerTransactionInput) {
            action
            collectedCount
            fullName
            siteID
            siteName
            userPhoneNumber
            collectedItemType
            status
            ttl
        }
    }
    `
};