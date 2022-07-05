module.exports = {
    siteManagerByID: `query siteManagerByID($id: ID!) {
        siteManagerByID(id: $id) {
            items {
                id
                phoneNumber
                preferredLanguage
                siteID
            }
        }
    }
    `,
    siteManagerBySiteID: `query siteManagerBySite($siteID: ID!) {
        siteManagerBySite(siteID: $siteID) {
            items {
                id
                phoneNumber
                preferredLanguage
                siteID
            }
        }
    }
    `,
    siteManagerByPhoneNumber: `query siteManagerByPhoneNumber($phoneNumber: String!) {
        siteManagerByPhoneNumber(phoneNumber: $phoneNumber) {
            items {
                id
                phoneNumber
                preferredLanguage
                siteID
            }
        }
    }
    `,
    listSiteManagers: `query listSiteManagers {
        listSiteManagers {
            items {
                phoneNumber
            }
        }
    }
    `
};