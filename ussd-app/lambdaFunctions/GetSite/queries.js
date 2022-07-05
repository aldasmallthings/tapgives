module.exports = {
    listSites: `query listSites {
        listSites {
            items {
                id
                description
                name
                nickname
                subscriptionFee
                smsDescription
            }
        }
    }
    `,
    getSiteByID: `query getSite($id: ID!) {
        getSite(id: $id) {
            avgLineCount
            avgWaitMinute
            description
            expectedJerrycans
            id
            name
            nickname
            smsDescription
            subscriptionFee
        }
    }
    `,
    getSiteByNickname: `query siteByNickname($nickname: String!) {
        siteByNickname(nickname: $nickname) {
            items {
                avgLineCount
                avgWaitMinute
                expectedJerrycans
                description
                id
                name
                nickname
                smsDescription
                status
                subscriptionFee
            }
        }
    }
    `
};