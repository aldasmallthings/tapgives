/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const athenaCall = /* GraphQL */ `
  query AthenaCall(
    $userPhoneNumber: String
    $siteName: String!
    $year: Int!
    $month: Int!
    $day: Int!
    $hour: Int!
  ) {
    athenaCall(
      userPhoneNumber: $userPhoneNumber
      siteName: $siteName
      year: $year
      month: $month
      day: $day
      hour: $hour
    )
  }
`;
export const broadcastMessage = /* GraphQL */ `
  query BroadcastMessage(
    $siteID: String!
    $message: String!
    $allCustomers: String
    $customersBySite: String
    $allSiteManagers: String
    $siteManagersBySite: String
  ) {
    broadcastMessage(
      siteID: $siteID
      message: $message
      allCustomers: $allCustomers
      customersBySite: $customersBySite
      allSiteManagers: $allSiteManagers
      siteManagersBySite: $siteManagersBySite
    )
  }
`;
export const getSiteManager = /* GraphQL */ `
  query GetSiteManager($id: ID!, $siteID: ID!) {
    getSiteManager(id: $id, siteID: $siteID) {
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
export const listSiteManagers = /* GraphQL */ `
  query ListSiteManagers(
    $id: ID
    $siteID: ModelIDKeyConditionInput
    $filter: ModelSiteManagerFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSiteManagers(
      id: $id
      siteID: $siteID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const siteManagerByID = /* GraphQL */ `
  query SiteManagerByID(
    $id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSiteManagerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    siteManagerByID(
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const siteManagerBySite = /* GraphQL */ `
  query SiteManagerBySite(
    $siteID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSiteManagerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    siteManagerBySite(
      siteID: $siteID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const siteManagerByPhoneNumber = /* GraphQL */ `
  query SiteManagerByPhoneNumber(
    $phoneNumber: String!
    $sortDirection: ModelSortDirection
    $filter: ModelSiteManagerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    siteManagerByPhoneNumber(
      phoneNumber: $phoneNumber
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getCustomer = /* GraphQL */ `
  query GetCustomer($id: ID!) {
    getCustomer(id: $id) {
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
export const listCustomers = /* GraphQL */ `
  query ListCustomers(
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const customerBySite = /* GraphQL */ `
  query CustomerBySite(
    $siteID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    customerBySite(
      siteID: $siteID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const customerByPhoneNumber = /* GraphQL */ `
  query CustomerByPhoneNumber(
    $phoneNumber: String!
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    customerByPhoneNumber(
      phoneNumber: $phoneNumber
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const customerByFirstName = /* GraphQL */ `
  query CustomerByFirstName(
    $firstName: String!
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    customerByFirstName(
      firstName: $firstName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const customerBySubscriptionExpiration = /* GraphQL */ `
  query CustomerBySubscriptionExpiration(
    $subscriptionExpiration: String!
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    customerBySubscriptionExpiration(
      subscriptionExpiration: $subscriptionExpiration
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const customerByMonthlySubscriptionCode = /* GraphQL */ `
  query CustomerByMonthlySubscriptionCode(
    $monthlySubscriptionCode: String!
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    customerByMonthlySubscriptionCode(
      monthlySubscriptionCode: $monthlySubscriptionCode
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getSite = /* GraphQL */ `
  query GetSite($id: ID!) {
    getSite(id: $id) {
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
export const listSites = /* GraphQL */ `
  query ListSites(
    $filter: ModelSiteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSites(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const siteByNickname = /* GraphQL */ `
  query SiteByNickname(
    $nickname: String!
    $sortDirection: ModelSortDirection
    $filter: ModelSiteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    siteByNickname(
      nickname: $nickname
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getCustomerTransactions = /* GraphQL */ `
  query GetCustomerTransactions($id: ID!) {
    getCustomerTransactions(id: $id) {
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
export const listCustomerTransactions = /* GraphQL */ `
  query ListCustomerTransactions(
    $filter: ModelCustomerTransactionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomerTransactions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const customerTransactionByPhoneNumber = /* GraphQL */ `
  query CustomerTransactionByPhoneNumber(
    $userPhoneNumber: String!
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerTransactionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    customerTransactionByPhoneNumber(
      userPhoneNumber: $userPhoneNumber
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const customerTransactionBySite = /* GraphQL */ `
  query CustomerTransactionBySite(
    $siteID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerTransactionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    customerTransactionBySite(
      siteID: $siteID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
