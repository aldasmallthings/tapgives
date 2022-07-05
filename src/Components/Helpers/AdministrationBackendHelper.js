import {API, Auth} from "aws-amplify";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import {deleteCustomer} from "../../graphql/mutations";

// Note: When any of the "list" functions will return over 100 entries, you must make sure to change it to a version with a nextToken
// Since graphql only returns 100 values at once
class AdministrationBackendHelper {
    static async getSite(siteIDInput) {
        return (await API.graphql({
            query: queries.getSite,
            variables: {
                id: siteIDInput
            }
        })).data.getSite
    }
    static async getSites() {
        return (await API.graphql({query: queries.listSites})).data.listSites.items;
    }
    static async getSiteManagers() {
        let query = (await API.graphql({
            query: queries.listSiteManagers,
        }));
        let siteManagerFull = query.data.listSiteManagers.items;
        let nextToken = query.data.listSiteManagers.nextToken;
        while (nextToken != null) {
            query = (await API.graphql({
                query: queries.listSiteManagers,
                variables: {
                    nextToken: nextToken,
                }
            }));
            siteManagerFull.push(...query.data.listSiteManagers.items)
            nextToken = query.data.listSiteManagers.nextToken
        }
        return siteManagerFull;
        // (await API.graphql({query: queries.listSiteManagers})).data.listSiteManagers.items
        // return (await API.graphql({query: queries.listSiteManagers})).data.listSiteManagers.items;
    }
    // static async getSiteSubscriptions() {
    //     return (await API.graphql({query: queries.listSiteSubscriptions})).data.listSiteSubscriptions.items;
    // }
    // static async getSiteSubscriptionsBySite(siteIDInput) {
    //     return ((await API.graphql({
    //         query: queries.getSite,
    //         variables: {
    //             id: siteIDInput
    //         }
    //     })).data.getSite.siteSubscriptions.items)
    // }
    static async getSitesBySiteManager(siteManagerInput) {
        const siteManagerList = (await API.graphql({
            query: queries.siteManagerByID,
            variables: {
                id: siteManagerInput
            }
        })).data.siteManagerByID.items;
        return siteManagerList.map((siteManager) => siteManager.site)
    }
    static async getSiteManagerBySite(siteIDInput) {
        const siteManagerList = (await API.graphql({
            query: queries.siteManagerBySite,
            variables: {
                siteID: siteIDInput
            }
        })).data.siteManagerBySite.items;
        return siteManagerList
    }
    static async getSiteIDsBySiteManager(siteManagerInput) {
        const siteManagerList = (await API.graphql({
            query: queries.siteManagerByID,
            variables: {
                id: siteManagerInput
            }
        })).data.siteManagerByID.items;
        return siteManagerList.map((siteManager) => siteManager.siteID)
    }

    // By limits of Appsync, you're limited to queries of 100mb/100 items, this is just one query.  Below has the
    // recursive operation which will call queries until you reach all the items
    static async getCustomersBySiteFast(siteIDInput) {
        const out = (await API.graphql({
            query: queries.customerBySite,
            variables: {
                siteID: siteIDInput
            }
        })).data.customerBySite
        return {
            data:out.items,
            next:out.nextToken,
        };
    }
    static async getCustomersBySiteFastNextToken(siteIDInput, nextToken) {
        const out = (await API.graphql({
            query: queries.customerBySite,
            variables: {
                siteID: siteIDInput,
                nextToken: nextToken,
            }
        })).data.customerBySite
        return {
            data:out.items,
            next:out.nextToken,
        };
    }
    static async getCustomersBySiteFastFilter(siteID, filter) {
        const out = (await API.graphql({
            query: queries.customerBySite,
            variables: {
                siteID: siteID,
                filter: filter,
            }
        })).data.customerBySite
        return {
            data:out.items,
            next:out.nextToken,
        };
    }
    static async getCustomersBySiteFastNextTokenFilter(siteID, nextToken, filter) {
        const out = (await API.graphql({
            query: queries.customerBySite,
            variables: {
                siteID: siteID,
                nextToken: nextToken,
                filter: filter,
            }
        })).data.customerBySite
        return {
            data:out.items,
            next:out.nextToken,
        };
    }
    // The slower, full versions of the above queries
    static async getCustomersBySite(siteIDInput) {

        let query = (await API.graphql({
            query: queries.customerBySite,
            variables: {
                siteID: siteIDInput
            }
        }));
        let fullListOfCustomers = query.data.customerBySite.items;
        let nextToken = query.data.customerBySite.nextToken;
        while (nextToken != null) {
            query = (await API.graphql({
                query: queries.customerBySite,
                variables: {
                    nextToken: nextToken,
                    siteID: siteIDInput
                }
            }));
            fullListOfCustomers.push(...query.data.customerBySite.items)
            nextToken = query.data.customerBySite.nextToken
        }
        return fullListOfCustomers;
    }
    static async getCustomersByDynamic(queryType, field, value) {
        let out = (await API.graphql({
            query: queryType,
            variables: {
                [field]: value,
            }
        })).data
        out = out[Object.keys(out)]
        return {
            data:out.items,
            next:out.nextToken,
        };
    }
    static async getCustomersByDynamicFilter(queryType, field, value, filter) {
        let out = (await API.graphql({
            query: queryType,
            variables: {
                [field]: value,
                filter: filter,
            }
        })).data
        out = out[Object.keys(out)]
        return {
            data:out.items,
            next:out.nextToken,
        };
    }
    static async getCustomer(customerID) {
        const customerList = (await API.graphql({
            query: queries.getCustomer,
            variables: {
                id: customerID
            }
        })).data.getCustomer;
        return customerList
    }

    static async createSiteManager(siteManagerID, siteID, phoneNumber) {
        const siteManager = {
            id: siteManagerID,
            siteID: siteID,
            phoneNumber: phoneNumber,
            preferredLanguage: "en",
        }
        await API.graphql({
            query: mutations.createSiteManager,
            variables: {input: siteManager}
        })

    }
    // This is a function that should not be called by the website in real usage scenarios.
    static async createCustomer(firstName, lastName, siteIDIn, pinIn, phoneNumberIn) {
        const customer = {
            siteID: siteIDIn,
            validSubscription: "true",
            pin: pinIn,
            phoneNumber: phoneNumberIn,
            firstName: firstName,
            lastName: lastName,
            preferredLanguage: "en",
            subscriptionExpiration: "2022-04-"+Math.floor(Math.random()*30),
            monthlySubscriptionCode: Math.ceil(Math.random()*9)*1000+Math.floor(Math.random()*1000),
            jerrycansAllowed: Math.floor(Math.random()*5),
        }
        await API.graphql({
            query: mutations.createCustomer,
            variables: {input: customer}
        })
    }
    static async createSite(siteCreationData) {
        try {
            const site = Object.assign(siteCreationData, {status: "online", currentSubscribers: 0})
            await API.graphql({
                query: mutations.createSite,
                variables: {input: site},
                authMode: 'AMAZON_COGNITO_USER_POOLS',
            })
        } catch (error) {
            //console.log("Error creating site: ", error)
        }
    }
    static async deleteSiteManager(siteManagerID, siteID) {
        if (siteID !== "") {
            //console.log("deleting site manager"+ siteManagerID+siteID)
            const siteManager = {
                id: siteManagerID,
                siteID: siteID,
            }
            await API.graphql({
                query: mutations.deleteSiteManager,
                authMode: 'AMAZON_COGNITO_USER_POOLS',
                variables: {input: siteManager}
            })
        }
    }
    static async deleteSite(siteIDIn) {
        const site = {
            id: siteIDIn,
        }
        await API.graphql({
            query: mutations.deleteSite,
            variables: {input: site}
        })
    }
    static async deleteCustomer(id) {
        const customerData = {
            id: id,
        }
        await API.graphql({
            query: mutations.deleteCustomer,
            variables: {input: customerData}
        })
    }
    // Delete Site and all associated sitemanagers and customers
    static async cascadeDeleteSite(siteIDInput) {
        const customers = await this.getCustomersBySite(siteIDInput)
        const siteManagers = await this.getSiteManagerBySite(siteIDInput)
        let cascadeDeleteSiteList = []
        for (const customer in customers) {
            cascadeDeleteSiteList.push(AdministrationBackendHelper.deleteCustomer(customers[customer].id))
        }
        //console.log(siteManagers)
        for (const siteManager in siteManagers) {
            cascadeDeleteSiteList.push(
                this.deleteSiteManager(siteManagers[siteManager].id, siteIDInput)
            )
        }
        await Promise.all(cascadeDeleteSiteList)
        await this.deleteSite(siteIDInput)
    }

    static async getTransactionsBySite(siteID) {
        const transactionList = (await API.graphql({
            query: queries.customerTransactionBySite,
            variables: {
                siteID: siteID
            }
        })).data.customerTransactionBySite.items;
        return transactionList
    }

    static async updateSite(idInput, siteChanges) {
        const siteData = siteChanges
        await API.graphql({
            query: mutations.updateSite,
            variables: {input:Object.assign(siteData, {id:idInput})}
        })
    }

    // This is a testing function to clear all tables.
    // You should not use this unless that's your intention
    static async clearAllCustomers() {
        let query = (await API.graphql({
            query: queries.listCustomers,
        }));
        let fullListOfCustomers = query.data.listCustomers.items;
        let nextToken = query.data.listCustomers.nextToken;
        let mutationPromiseList = []
        while (nextToken != null) {
            query = (await API.graphql({
                query: queries.listCustomers,
                variables: {
                    nextToken: nextToken
                }
            }));
            fullListOfCustomers.push(...query.data.listCustomers.items)
            nextToken = query.data.listCustomers.nextToken
        }
        for (const customer in fullListOfCustomers) {
            const customerData = {
                id: fullListOfCustomers[customer].id,
                siteID: fullListOfCustomers[customer].siteID,
            }
            mutationPromiseList.push(API.graphql({
                query: mutations.deleteCustomer,
                variables: {input: customerData}
            }))
        }
        return fullListOfCustomers;
    }

    static async broadcastMessage(siteID, message) {
        let data = (await API.graphql({
            query: queries.broadcastMessage,
            // Day and
            variables: {
                siteID: siteID,
                message: message,
            }
        })).data.broadcastMessage
        return data
    }

    // Can only be performed by Admin group
    // Lists all Cognito users
    static async listCognito(limit, nextToken = null){
        let apiName = 'AdminQueries';
        let path = '/listUsers';
        const queryParams =  (nextToken !== null)?{
                "groupname": "Editors",
                "limit": limit,
                "token": nextToken
            }:{
            "limit": limit,
        }
        let myInit = {
            queryStringParameters: queryParams,
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
            }
        }
        const { NextToken, ...rest } =  await API.get(apiName, path, myInit);
        // Implement usage of nextToken when needed.
        const list = await rest.Users.map((user)=>{
            const userUnwrapped = user.Attributes.reduce((prev, attribute)=> {
                return Object.assign(prev, {
                    [attribute.Name]: attribute.Value
                })
            }, {})
            return Object.assign(userUnwrapped, {id: user.Username})
        })
        // console.log(rest)
        return list;
    }
    // Can only be performed by Admin group
    static async addUserToGroup(username){
        let apiName = 'AdminQueries';
        let path = '/addUserToGroup';
        let myInit = {
            body: {
                "username" : username,
                "groupname": "SiteManagers"
            },
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
            }
        }
        return await API.post(apiName, path, myInit);
    }
    // Can only be performed by Admin group
    static async removeUserFromGroup(username){
        let apiName = 'AdminQueries';
        let path = '/removeUserFromGroup';
        let myInit = {
            body: {
                "username" : username,
                "groupname": "SiteManagers"
            },
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
            }
        }
        return await API.post(apiName, path, myInit);
    }
}

export default AdministrationBackendHelper