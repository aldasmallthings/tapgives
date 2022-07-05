/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSiteManager = /* GraphQL */ `
  subscription OnCreateSiteManager {
    onCreateSiteManager {
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
export const onUpdateSiteManager = /* GraphQL */ `
  subscription OnUpdateSiteManager {
    onUpdateSiteManager {
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
export const onDeleteSiteManager = /* GraphQL */ `
  subscription OnDeleteSiteManager {
    onDeleteSiteManager {
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
export const onCreateCustomer = /* GraphQL */ `
  subscription OnCreateCustomer {
    onCreateCustomer {
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
export const onUpdateCustomer = /* GraphQL */ `
  subscription OnUpdateCustomer {
    onUpdateCustomer {
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
export const onDeleteCustomer = /* GraphQL */ `
  subscription OnDeleteCustomer {
    onDeleteCustomer {
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
export const onCreateSite = /* GraphQL */ `
  subscription OnCreateSite {
    onCreateSite {
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
export const onUpdateSite = /* GraphQL */ `
  subscription OnUpdateSite {
    onUpdateSite {
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
export const onDeleteSite = /* GraphQL */ `
  subscription OnDeleteSite {
    onDeleteSite {
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
export const onCreateCustomerTransactions = /* GraphQL */ `
  subscription OnCreateCustomerTransactions {
    onCreateCustomerTransactions {
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
export const onUpdateCustomerTransactions = /* GraphQL */ `
  subscription OnUpdateCustomerTransactions {
    onUpdateCustomerTransactions {
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
export const onDeleteCustomerTransactions = /* GraphQL */ `
  subscription OnDeleteCustomerTransactions {
    onDeleteCustomerTransactions {
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
