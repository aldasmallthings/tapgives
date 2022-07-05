import React from "react";
import {Amplify, API, Auth, Storage} from "aws-amplify";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import awsconfig from '../../aws-exports';
import AdministrationBackendHelper from "../Helpers/AdministrationBackendHelper";
import LocalizationHelper from "../Helpers/LocalizationHelper";
import {baseLanguages, basePhrases} from "../languageData";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import Lambda from 'aws-sdk/clients/lambda'; // npm install aws-sdk
import {siteData, surnames, names} from "../nameData";


class DataStoreTest extends React.Component {
    constructor() {
        super();
        this.state = {
            id : "",
            phrase : "",
            data : "",
            sites: [],
            subs: [],
            customerTransaction: {
                site: [],
                userPhoneNumber : 0,
                fullName: "",
            },
            siteManagerData: {
                name: ""
            }
        }
    }
    async componentDidMount() {
        this.setState({
            sites: await AdministrationBackendHelper.getSites()
        })
    }
    async clearDataStore () {

    }

    async syncData() {
    }
    async addBaseData() {
        // await LocalizationHelper.addMultipleLanguagePhrases(baseLanguages)
        await Storage.put("basePhrases.json", basePhrases)
    }
    async addLanguages() {
        // await LocalizationHelper.addMultipleLanguageCodes(baseAssociations)
        await Storage.put("baseLanguages.json", baseLanguages)
    }
    async createUser() {
        const date = new Date()
        date.setMonth(date.getMonth()+1)

        let customers = (await API.graphql({
            query: queries.listCustomers,
        })).data.listCustomers.items;
        //console.log(customers)
        const CustomerTransactions = {
            userPhoneNumber: customers[0].phoneNumber,
            fullName: `${customers[0].firstName} ${customers[0].lastName}`,
            siteName: customers[0].site.name,
            siteID: customers[0].siteID,
            action: "visit",
            status: "success",
            collectedCount: 1,
            collectedItemType: "jerrycan",
            ttl: Math.round(date.getTime()/1000)
        }
        //console.log(CustomerTransactions)
        API.graphql({
            query: mutations.createCustomerTransactions,
            variables: {input: CustomerTransactions}
        })
        // for (const customer in customers) {
        //     try {
        //         const CustomerTransactions = {
        //             userPhoneNumber: customers[customer].phoneNumber,
        //             fullName: `${customers[customer].firstName} ${customers[customer].lastName}`,
        //             siteName: customers[customer].site.name,
        //             siteID: customers[customer].siteID,
        //             action: "visit",
        //             status: "success",
        //             collectedCount: 1,
        //             collectedItemType: "jerrycan",
        //             ttl: Math.round(date.getTime()/1000)
        //         }
        //         console.log(CustomerTransactions)
        //         API.graphql({
        //             query: mutations.createCustomerTransactions,
        //             variables: {input: CustomerTransactions}
        //         })
        //     } catch (e) {
        //         console.log(e)
        //     }
        //
        // }
    }
    async createManager() {
        const date = new Date()
        date.setMonth(date.getMonth()+1)
        const customer = await AdministrationBackendHelper.getCustomer("d8f170a4-89a6-49ec-9b3b-3335a47892e8")
        try {
            const CustomerTransactions = {
                userPhoneNumber: customer.phoneNumber,
                fullName: `${customer.firstName} ${customer.lastName}`,
                siteName: customer.site.name,
                siteID: customer.siteID,
                action: "unsubscribe",
                status: "success",
                collectedCount: 1,
                collectedItemType: "jerrycan",
                ttl: Math.round(date.getTime()/1000)
            }
            //console.log(CustomerTransactions)
            API.graphql({
                query: mutations.createCustomerTransactions,
                variables: {input: CustomerTransactions}
            })
        } catch (e) {
            //console.log(e)
        }

    }
    async tests3() {
        let customers = (await API.graphql({
            query: queries.listCustomers,
        })).data.listCustomers.items;
        const customer =  0
        const date = new Date()
        date.setMonth(date.getMonth()+1)
        const CustomerTransactions = {
            userPhoneNumber: customers[customer].phoneNumber,
            fullName: `${customers[customer].firstName} ${customers[customer].lastName}`,
            siteName: customers[customer].site.name,
            siteID: customers[customer].siteID,
            action: "subscription",
            status: "success",
            collectedCount: 1,
            collectedItemType: "jerrycan",
            ttl: Math.round(date.getTime()/1000)
        }
        //console.log(CustomerTransactions)
        API.graphql({
            query: mutations.createCustomerTransactions,
            variables: {input: CustomerTransactions}
        })
    }
    async simulate() {
        let sites = await AdministrationBackendHelper.getSites()
        if (sites.length === 0) {
            let siteCreationPromises = []
            // for (const pair in siteLocations) {
            //     siteCreationPromises.push(this.simpleCreateSite(pair, siteLocations[pair][0], siteLocations[pair][1]))
            // }
            for (const site in siteData) {
                siteCreationPromises.push(this.simpleCreateSite(siteData[site].name, siteData[site].nickname, siteData[site].location[0],siteData[site].location[1]))
            }
            await Promise.all(siteCreationPromises)
            sites = await AdministrationBackendHelper.getSites()
        }
        for (const site in sites) {
            try {
                for (let iterator = 0 ; iterator < 5; iterator++) {
                    AdministrationBackendHelper.createCustomer(names[Math.floor(Math.random()*names.length)], surnames[Math.floor(Math.random()*surnames.length)], sites[site].id, Math.floor(Math.random()*10000), "+254"+Math.floor(Math.random()*10000000))
                }
            } catch (e) {
                //console.log("Error creating customers for site: "+sites[site].id, e)
            }

        }
    }
    async simpleCreateSite(name, nickname, latitude, longitude) {
        const siteCreationData = {
            name: name,
            description: "Water site located at " + name,
            smsDescription: "sms description at " + name,
            nickname: nickname,
            serviceRadius: Math.floor(Math.random()*5+5),
            latitude: latitude,
            longitude: longitude,
            avgWaitMinute: Math.floor(Math.random()*5+3),
            avgLineCount: Math.floor(Math.random()*10+3),
            status: "online",
            subscriptionFee: Math.floor(Math.random()*15+3),
            expectedJerrycans: Math.floor(Math.random()*5+5),
        }
        await AdministrationBackendHelper.createSite(siteCreationData)
    }
    async testFunction() {
        // const input = {
        //     siteID: "test"
        // }
        //(siteID: String!, year: Int!, month: Int!, day: Int!, hour: Int!
        //console.log(await API.graphql({
        //     query: queries.athenaCall,
        //     variables: {
        //         siteID: "157dd0c2-4a22-42d8-becb-d206fcdc6092",
        //         year: 2022,
        //         month: 3,
        //         day: 10,
        //         hour: -1,
        //     }
        // }))
        // Auth.currentCredentials()
        //     .then(credentials => {
        //         const lambda = new Lambda({
        //             credentials: Auth.essentialCredentials(credentials)
        //         });
        //         return lambda.invoke({
        //             FunctionName: process.env.REACT_APP_FUNCTION,
        //             Payload: JSON.stringify({siteID: "test" }),
        //         });
        //     })
        // const creds = Auth.essentialCredentials(await Auth.currentCredentials())
        // const lambda = new Lambda(creds)
        // console.log(await (lambda.invoke({
        //     FunctionName: process.env.REACT_APP_FUNCTION,
        //     Payload: JSON.stringify({siteID: "test" }),
        // })))
        // const siteManagerList = (await API.graphql({
        //     query: queries.siteManagerBySite,
        //     variables: {
        //         siteID: "157dd0c2-4a22-42d8-becb-d206fcdc6092"
        //     }
        // })).data.siteManagerBySite.items;
        // const data = {
        //     siteID: "157dd0c2-4a22-42d8-becb-d206fcdc6092"
        // }
        // console.log(siteManagerList)

    }
    async deleteSiteSubscription(){
        // LocalizationHelper.deleteLanguageCascade("test")
        LocalizationHelper.queryPhrases()
    }
    render() {
        return(
            <Grid direction={"column"}>
                <Grid>
                    <div>
                        This should be the dataStore test
                    </div>
                    <Button variant="outlined" onClick={this.clearDataStore.bind(this)}>
                        Clear DataStore
                    </Button>
                    <Button variant="outlined" onClick={this.syncData.bind(this)}>
                        Sync to cloud
                    </Button>
                    <TextField variant="outlined"  label={"Language Code"} onChange={(val) => {this.setState({id: val.target.value})}}/>
                    <TextField variant="outlined" label={"Phrase Prompt"} onChange={(val) => {this.setState({phrase: val.target.value})}}/>
                    <TextField variant="outlined"  label={"Data"} onChange={(val) => {this.setState({data: val.target.value})}}/>
                    <Button variant="outlined" onClick={this.addBaseData.bind(this)}>
                        Add Base Data
                    </Button>
                    <Button variant="outlined" onClick={this.addLanguages.bind(this)}>
                        Add Base Languages
                    </Button>
                </Grid>
                <Grid direction={"row"}>
                    <TextField variant="outlined" label={"Phone Number"} onChange={(val) => {
                        customerData : Object.assign(this.state.customerTransaction, {userPhoneNumber: val.target.value})
                    }}/>
                    <TextField variant="outlined"  label={"Name"} onChange={(val) => {
                        customerData : Object.assign(this.state.customerTransaction, {fullName: val.target.value})
                        //console.log(val)
                    }}/>
                    <FormControl style = {{ width: "150px"}}>
                        <InputLabel id="site-label">Sites</InputLabel>
                        <Select
                            labelId="site-label"
                            id="sites"
                            value={this.state.customerTransaction.site}
                            onChange={async (event) => {
                                const {
                                    target: {value},
                                } = event;
                                // const subs = (await DataStore.query(Site, value)).subs
                                //console.log(value)
                                this.setState({
                                    customerData: Object.assign(this.state.customerTransaction, {site: value}),
                                });
                            }}
                        >
                            {this.state.sites.map((site)=> {
                                return <MenuItem key = {site.name+"key"} value = {site.id}>
                                    {site.name}
                                </MenuItem>
                            })}

                        </Select>
                    </FormControl>
                    {/*<FormControl style = {{ width: "120px"}}>*/}
                    {/*    <InputLabel id="subscription-label">Subscriptions</InputLabel>*/}
                    {/*    <Select*/}
                    {/*        labelId="sites"*/}
                    {/*        id="subscriptions"*/}
                    {/*        value={this.state.customerData.sub}*/}
                    {/*        onChange={(event)=>{*/}
                    {/*            const {*/}
                    {/*                target: { value },*/}
                    {/*            } = event;*/}
                    {/*            this.setState({*/}
                    {/*                customerData: Object.assign(this.state.customerData, {sub: value})*/}
                    {/*            });*/}
                    {/*            console.log(value)*/}
                    {/*        }}*/}
                    {/*    >*/}
                    {/*        {this.state.subs.map((sub)=> {*/}
                    {/*            const val = sub.name+" ("+sub.expectedJerrycans+"/ $"+sub.pricePerMonth+")"*/}
                    {/*            return <MenuItem key = {val+"key"} value = {sub.id}>*/}
                    {/*                {val}*/}
                    {/*            </MenuItem>*/}
                    {/*        })}*/}

                    {/*    </Select>*/}
                    {/*</FormControl>*/}
                    <Button variant="outlined" onClick={this.createUser.bind(this)}>
                        Site History
                    </Button>
                </Grid>
                <Grid>
                    <TextField variant="outlined"  label={"Manager Email"} onChange={(val) => {
                        siteManagerData : Object.assign(this.state.siteManagerData, {name: val.target.value})
                    }}/>
                    <TextField variant="outlined"  label={"Site ID"} onChange={(val) => {
                        siteManagerData : Object.assign(this.state.siteManagerData, {site: val.target.value})
                    }}/>
                    <Button variant="outlined" onClick={this.createManager.bind(this)}>
                        Create Site Manager
                    </Button>
                </Grid>
                <Button variant="outlined" onClick={this.simulate.bind(this)}>
                    Generate Sites and Customers
                </Button>
                <Button variant="outlined" onClick={()=>{LocalizationHelper.queryPhrases()}}>
                    Test button
                </Button>
            </Grid>

        )
    }
}

export default DataStoreTest