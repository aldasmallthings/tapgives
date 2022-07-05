/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSiteManager = /* GraphQL */ `
  mutation CreateSiteManager(
    $input: CreateSiteManagerInput!
    $condition: ModelSiteManagerConditionInput
  ) {
    createSiteManager(input: $input, condition: $condition) {
      id
      siteID
      site {
        id
        name
        nickname
        smsDescription
        description
        serviceRadius
        latitude
        longitude
        avgWaitMinute
        avgLineCount
        status
        subscriptionFee
        expectedJerrycans
        currentSubscribers
        createdAt
        updatedAt
      }
      phoneNumber
      preferredLanguage
      createdAt
      updatedAt
    }
  }
`;
export const updateSiteManager = /* GraphQL */ `
  mutation UpdateSiteManager(
    $input: UpdateSiteManagerInput!
    $condition: ModelSiteManagerConditionInput
  ) {
    updateSiteManager(input: $input, condition: $condition) {
      id
      siteID
      site {
        id
        name
        nickname
        smsDescription
        description
        serviceRadius
        latitude
        longitude
        avgWaitMinute
        avgLineCount
        status
        subscriptionFee
        expectedJerrycans
        currentSubscribers
        createdAt
        updatedAt
      }
      phoneNumber
      preferredLanguage
      createdAt
      updatedAt
    }
  }
`;
export const deleteSiteManager = /* GraphQL */ `
  mutation DeleteSiteManager(
    $input: DeleteSiteManagerInput!
    $condition: ModelSiteManagerConditionInput
  ) {
    deleteSiteManager(input: $input, condition: $condition) {
      id
      siteID
      site {
        id
        name
        nickname
        smsDescription
        description
        serviceRadius
        latitude
        longitude
        avgWaitMinute
        avgLineCount
        status
        subscriptionFee
        expectedJerrycans
        currentSubscribers
        createdAt
        updatedAt
      }
      phoneNumber
      preferredLanguage
      createdAt
      updatedAt
    }
  }
`;
export const createCustomer = /* GraphQL */ `
  mutation CreateCustomer(
    $input: CreateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    createCustomer(input: $input, condition: $condition) {
      id
      siteID
      site {
        id
        name
        nickname
        smsDescription
        description
        serviceRadius
        latitude
        longitude
        avgWaitMinute
        avgLineCount
        status
        subscriptionFee
        expectedJerrycans
        currentSubscribers
        createdAt
        updatedAt
      }
      validSubscription
      pin
      phoneNumber
      firstName
      lastName
      preferredLanguage
      subscriptionExpiration
      monthlySubscriptionCode
      jerrycansAllowed
      createdAt
      updatedAt
    }
  }
`;
export const updateCustomer = /* GraphQL */ `
  mutation UpdateCustomer(
    $input: UpdateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    updateCustomer(input: $input, condition: $condition) {
      id
      siteID
      site {
        id
        name
        nickname
        smsDescription
        description
        serviceRadius
        latitude
        longitude
        avgWaitMinute
        avgLineCount
        status
        subscriptionFee
        expectedJerrycans
        currentSubscribers
        createdAt
        updatedAt
      }
      validSubscription
      pin
      phoneNumber
      firstName
      lastName
      preferredLanguage
      subscriptionExpiration
      monthlySubscriptionCode
      jerrycansAllowed
      createdAt
      updatedAt
    }
  }
`;
export const deleteCustomer = /* GraphQL */ `
  mutation DeleteCustomer(
    $input: DeleteCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    deleteCustomer(input: $input, condition: $condition) {
      id
      siteID
      site {
        id
        name
        nickname
        smsDescription
        description
        serviceRadius
        latitude
        longitude
        avgWaitMinute
        avgLineCount
        status
        subscriptionFee
        expectedJerrycans
        currentSubscribers
        createdAt
        updatedAt
      }
      validSubscription
      pin
      phoneNumber
      firstName
      lastName
      preferredLanguage
      subscriptionExpiration
      monthlySubscriptionCode
      jerrycansAllowed
      createdAt
      updatedAt
    }
  }
`;
export const createSite = /* GraphQL */ `
  mutation CreateSite(
    $input: CreateSiteInput!
    $condition: ModelSiteConditionInput
  ) {
    createSite(input: $input, condition: $condition) {
      id
      name
      nickname
      smsDescription
      description
      serviceRadius
      latitude
      longitude
      avgWaitMinute
      avgLineCount
      status
      subscriptionFee
      expectedJerrycans
      currentSubscribers
      createdAt
      updatedAt
    }
  }
`;
export const updateSite = /* GraphQL */ `
  mutation UpdateSite(
    $input: UpdateSiteInput!
    $condition: ModelSiteConditionInput
  ) {
    updateSite(input: $input, condition: $condition) {
      id
      name
      nickname
      smsDescription
      description
      serviceRadius
      latitude
      longitude
      avgWaitMinute
      avgLineCount
      status
      subscriptionFee
      expectedJerrycans
      currentSubscribers
      createdAt
      updatedAt
    }
  }
`;
export const deleteSite = /* GraphQL */ `
  mutation DeleteSite(
    $input: DeleteSiteInput!
    $condition: ModelSiteConditionInput
  ) {
    deleteSite(input: $input, condition: $condition) {
      id
      name
      nickname
      smsDescription
      description
      serviceRadius
      latitude
      longitude
      avgWaitMinute
      avgLineCount
      status
      subscriptionFee
      expectedJerrycans
      currentSubscribers
      createdAt
      updatedAt
    }
  }
`;
export const createCustomerTransactions = /* GraphQL */ `
  mutation CreateCustomerTransactions(
    $input: CreateCustomerTransactionsInput!
    $condition: ModelCustomerTransactionsConditionInput
  ) {
    createCustomerTransactions(input: $input, condition: $condition) {
      id
      userPhoneNumber
      fullName
      siteName
      siteID
      action
      status
      collectedCount
      collectedItemType
      ttl
      createdAt
      updatedAt
    }
  }
`;
export const updateCustomerTransactions = /* GraphQL */ `
  mutation UpdateCustomerTransactions(
    $input: UpdateCustomerTransactionsInput!
    $condition: ModelCustomerTransactionsConditionInput
  ) {
    updateCustomerTransactions(input: $input, condition: $condition) {
      id
      userPhoneNumber
      fullName
      siteName
      siteID
      action
      status
      collectedCount
      collectedItemType
      ttl
      createdAt
      updatedAt
    }
  }
`;
export const deleteCustomerTransactions = /* GraphQL */ `
  mutation DeleteCustomerTransactions(
    $input: DeleteCustomerTransactionsInput!
    $condition: ModelCustomerTransactionsConditionInput
  ) {
    deleteCustomerTransactions(input: $input, condition: $condition) {
      id
      userPhoneNumber
      fullName
      siteName
      siteID
      action
      status
      collectedCount
      collectedItemType
      ttl
      createdAt
      updatedAt
    }
  }
`;
