import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import {
    Button, Checkbox,
    CircularProgress, FormControl, InputLabel, MenuItem,
    Paper,
    Popover, Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, TextField
} from "@material-ui/core";
import AdministrationBackendHelper from "../Helpers/AdministrationBackendHelper";
import {Auth} from "aws-amplify";
import {DataGrid} from "@mui/x-data-grid";
import * as queries from "../../graphql/queries";

const filterables = [
    "firstName","lastName","phoneNumber","subscriptionExpiration"
]
const queryTypes = [
    ["siteID", queries.customerBySite],
    ["firstName", queries.customerByFirstName],
    ["phoneNumber", queries.customerByPhoneNumber],
    ["subscriptionExpiration", queries.customerBySubscriptionExpiration],
    ["monthlySubscriptionCode", queries.customerByMonthlySubscriptionCode],
]
function SiteCustomers(props) {
    const {
        strings,
        history,
    } = props;
    const url = window.location.pathname

    const [loading, setLoading] = useState(true)
    const [sites, setSites] = useState([])
    const [customers, setCustomers] = useState([])
    const [nextToken, setNextToken] = useState(null)
    const [siteID, setSiteID] = useState(url.substring(15))
    const [site, setSite] = useState(null)
    const [popover, setPopover] = useState("")
    const [anchorEl, setAnchorEl] = useState(null);
    const [filters, setFilters] = useState([])
    const [queryType, setQueryType] = useState(0)
    const [queryable, setQueryable] = useState(siteID)

    const columns = [
        {
            field: "firstName",
            headerName: strings.firstName,
            width: 150,
        },
        {
            field: "lastName",
            headerName: strings.lastName,
            width: 150,
        },
        {
            field: "phoneNumber",
            headerName: strings.phoneNumber,
            width: 175,
        },
        {
            field: "subscriptionExpiration",
            headerName: strings.subscriptionExpiration,
            width: 225,
        },
        {
            field: "validSubscription",
            headerName: strings.subscriptionStatus,
            width: 200,
            renderCell: (input)=>(input.formattedValue==="true"?<Checkbox disabled checked />:<Checkbox disabled  />)
        },
        {
            field: "jerrycansAllowed",
            headerName: strings.jerrycansAllowed,
            width: 200,
        },
        {
            field: "jerrycansAllowed",
            headerName: strings.jerrycansAllowed,
            width: 200,
        },
        {
            field: "monthlySubscriptionCode",
            headerName: strings.monthlySubscriptionCode,
            width: 175,
            renderCell: (input) => (
                <TableCell>
                    <Button aria-describedby={input.row.id} variant="contained"
                            onClick={
                                (event)=>{setAnchorEl(event.currentTarget)
                                    setPopover(input.row.id)
                                }}>
                        {strings.pin}
                    </Button>
                    <Popover
                        id = {input.row.id}
                        open = {popover===input.row.id}
                        anchorEl = {anchorEl}
                        onClose = {()=>{setPopover("")}}
                    >
                        {input.row.monthlySubscriptionCode}
                    </Popover>
                </TableCell>
            ),
        },
        {
            field: "query",
            headerName: strings.queryHistory,
            width: 175,
            renderCell: (input) => (
                <TableCell>
                    <Button aria-describedby={input.row.id} variant="contained"
                            onClick={
                                (event)=>{
                                    history.push("/customer/"+input.row.id)
                                }
                            }
                    >
                        Query
                    </Button>

                </TableCell>
            ),
        },
    ]

    // Whenever the site changes makes sure the customers are updated and relevant
    useEffect(async ()=> {
        await findSite()
    },[siteID])
    // Find all sites associated to site manager and queries the customer list (up to 100, must manually query for more)
    async function findSite() {

        const id = (await Auth.currentAuthenticatedUser()).attributes.sub;
        const currSites = await AdministrationBackendHelper.getSitesBySiteManager(id)
        setSites(currSites)
        if (currSites.length === 0) {
            //console.log("No sites managed")
        }
        else {
            if (siteID.length === 0) {
                history.push('/siteCustomers/'+currSites[0].id)
                setSiteID(currSites[0].id)
                setSite(currSites[0])
                const getCustomers = await AdministrationBackendHelper.getCustomersBySiteFast(currSites[0].id);
                setCustomers(getCustomers.data)
                setNextToken(getCustomers.next)
                setLoading(false)
            } else {
                const getCustomers = await AdministrationBackendHelper.getCustomersBySiteFast(siteID);
                setCustomers(getCustomers.data)
                setNextToken(getCustomers.next)
                setSite(await AdministrationBackendHelper.getSite(siteID))
                setLoading(false)
            }
        }
    }
    // Queries the customers based off the current filters (accepts no filters)
    async function queryDynamic() {
        setLoading(true)
        if (filters.length === 0) {
            // Default for no filters
            const getCustomers = await AdministrationBackendHelper.getCustomersByDynamic( queryTypes[queryType][1], queryTypes[queryType][0], queryable);
            setCustomers(getCustomers.data)
            setNextToken(getCustomers.next)
        } else {
            // Creates the filters for graphql
            let queryFilter = {
                and: []
            }
            for (const filter in filters) {
                queryFilter.and.push({[filters[filter].attribute]: {eq:filters[filter].value}})
            }
            const getCustomers = await AdministrationBackendHelper.getCustomersByDynamicFilter(queryTypes[queryType][1], queryTypes[queryType][0], queryable, queryFilter)
            setCustomers(getCustomers.data)
            setNextToken(getCustomers.next)
        }
        setLoading(false)
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs = {12} md = {2}>
                <Paper>
                    <div style={{ height: "800px", width: '100%', overflowY: "scroll"}}>
                        <Table>
                            <TableHead>
                                <TableCell align={"center"} >
                                    <div class="title">{strings.sites}</div>
                                </TableCell>
                            </TableHead>
                            <TableBody sx={{overflowY: "scroll"}}>
                                {sites.map((siteCell, index)=>(
                                    <TableRow hover  >
                                        <TableCell onClick={()=>{
                                            history.push('/siteCustomers/'+siteCell.id)
                                            setCustomers([])
                                            setSiteID(siteCell.id)
                                            setQueryType(0)
                                            setQueryable(siteCell.id)
                                            setSite(sites[index])
                                            setLoading(true)
                                            findSite()
                                        }}>
                                            <div><b>{siteCell.name}</b>{" ("+siteCell.nickname+')'}</div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs = {12} md = {10}>
                <Grid container direction={"column"} spacing={2}>
                    <Grid item>
                        <div className="title">
                            {site==null?siteID:`${site.name} (${siteID})`}
                        </div>
                    </Grid>
                    <Grid item>
                        <div width={"100%"}>
                            <div className="title">
                                <b>{strings.search}</b>
                            </div>
                        </div>
                    </Grid>
                    <Grid item container spacing={4}>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id="select-label">{strings.property}</InputLabel>
                                <Select
                                    labelId="select-label"
                                    value={queryTypes[queryType][0]}
                                    label="Age"
                                    onChange={(event)=>{
                                        // const newFilter = filters.slice()
                                        // newFilter[index].attribute = event.target.value
                                        // setFilters(newFilter)
                                        setQueryType(queryTypes.findIndex((item)=>{
                                            return event.target.value === item[0]
                                        }))
                                    }}
                                >
                                    {queryTypes.map((type) =>(
                                        <MenuItem value = {type[0]}> {type[0]} </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                variant="outlined"
                                label={strings.value}
                                value={queryable}
                                onChange = {(event)=>{
                                    setQueryable(event.target.value)
                                }}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid item container direction={"column"} spacing={2}>
                        {filters.map((filter, index) => (
                            <Grid item container spacing={4}>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="select-label">{strings.property}</InputLabel>
                                        <Select
                                            labelId="select-label"
                                            value={filter.attribute}
                                            onChange={(event)=>{
                                                const newFilter = filters.slice()
                                                newFilter[index].attribute = event.target.value
                                                setFilters(newFilter)
                                            }}
                                        >
                                            {filterables.map((trait) =>(
                                                <MenuItem value = {trait}> {trait} </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        label={strings.value}
                                        onChange = {(event)=>{
                                            const newFilter = filters.slice()
                                            newFilter[index].value = event.target.value
                                            setFilters(newFilter)
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Button
                                        variant={"outlined"}
                                        onClick={() => {
                                            const newFilter = filters.slice()
                                            newFilter.splice(index, 1)
                                            setFilters(newFilter)
                                        }}>
                                        {strings.remove}
                                    </Button>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid item container>
                        <Grid item container xs = {6}>
                            <Grid item>
                                <Button variant={"contained"} onClick={()=>{
                                    queryDynamic()
                                }}>
                                    {strings.scan}
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant={"contained"} onClick={()=>{
                                    const newFilter = filters.slice()
                                    newFilter.push({attribute:"", value: ""})
                                    setFilters(newFilter)
                                }}>
                                    {strings.addFilter}
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item container xs = {6} justifyContent={"flex-end"}>
                            <Grid item>
                                <Button
                                    variant={"contained"}
                                    disabled={nextToken==null}
                                >
                                    {strings.getMoreResults}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    {<Grid item>
                        <Paper>
                            <div style = {{"height": 650}}width={"100%"} >
                                {loading?<Grid container direction={"column"} alignContent={"center"}>
                                    <Grid item>
                                        <CircularProgress/>
                                    </Grid>
                                </Grid>:
                                <DataGrid
                                    columns={columns}
                                    rows={customers}
                                    autoPageSize
                                />}
                            </div>
                        </Paper>
                    </Grid>}
                </Grid>
            </Grid>
        </Grid>
    );
}

const mapStateToProps = (state) => {
    return {
        loginState: state.loginState.currentState,
        language: state.languageState.language,
        code: state.languageState.code,
        languageCode: state.languageState.languageCodes,
        strings: state.languageState.strings,
    };
};



export default connect(mapStateToProps)(SiteCustomers);