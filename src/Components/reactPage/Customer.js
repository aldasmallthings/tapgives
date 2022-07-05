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
import {API, Auth} from "aws-amplify";
import * as queries from "../../graphql/queries";
import {DataGrid} from "@mui/x-data-grid";
// The properties of the customer we'd want to show
const customerTraits = [
    "id", "firstName","lastName","phoneNumber","subscriptionExpiration"
]

function Customer(props) {
    const {
        strings,
        history,
    } = props;
    const url = window.location.pathname
    const columns = [
        {
            field: "action",
            headerName: strings.action,
            flex: 1,
        },
        {
            field: "collectedcount",
            headerName: strings.collectedItemCount,
            flex: 1,
        },
        {
            field: "collecteditemtype",
            headerName: strings.collectedItemType,
            flex: 1,
        },
        {
            field: "sitename",
            headerName: strings.siteName,
            flex: 1,
        },
        {
            field: "year",
            headerName: strings.year,
            flex: 1,
        },
        {
            field: "month",
            headerName: strings.month,
            flex: 1,
        },
        {
            field: "day",
            headerName: strings.day,
            flex: 1,
        },
        {
            field: "hour",
            headerName: strings.hour,
            flex: 1,
        },

    ]
    const [loading, setLoading] = useState(true)
    const [customerID, setCustomerID] = useState(url.substring(10))
    const [customer, setCustomer] = useState(null)
    const [rows, setRows] = useState([])
    useEffect(async ()=> {
        //console.log(customerID)
        const customer = await AdministrationBackendHelper.getCustomer(customerID)
        setCustomer(customer)
        //console.log(customer)
        await athenaQuery(customer)
        // Get customer info and query by their phone number
    },[])
    async function athenaQuery(customer) {
        // Querys the customerTrans
        let data = (await API.graphql({
            query: queries.athenaCall,
            // Day and
            variables: {
                siteName: customer.site.name,
                userPhoneNumber: customer.phoneNumber,
                year: -1,
                month: -1,
                day: -1,
                hour: -1,
            }
        })).data.athenaCall
        //console.log(data)
        // // Athena call returns a string seperated by \n for rows, and , for columns.  All values are in strings
        let split = (data.split('\n'))
        split.pop() // last row is just an empty row
        let regex = new RegExp(/"/, "g") // removal all quotes
        for (let row in split) {
            // processing of rows
            split[row] = split[row].replaceAll(regex,"")
            split[row] = split[row].split(",")
        }
        const headers = split.shift() // first row is just column names
        split = split.map((row, index)=>{
            const out = {}
            for(const header in headers) {
                Object.assign(out, {[headers[header]]:row[header]})
            }
            Object.assign(out, {id:index})
            return out
        })
        //console.log(split)
        setRows(split)
        setLoading(false)
    }
    return (
        <Grid container>
            <Grid item xs={12}>
                <div class="title">
                    {customer!=null?`${customer.firstName} ${customer.lastName}`:null}
                </div>
            </Grid>
            <Grid item xs = {12}>
                <div style={{ height: "700px", width: '100%'}}>
                    {(loading)?
                        <Grid container direction={"column"} alignContent={"center"}>
                            <Grid item>
                                <CircularProgress/>
                            </Grid>
                        </Grid>
                        :
                        <DataGrid
                            rows = {rows}
                            columns = {columns}
                            checkboxSelection = {false}
                            autoPageSize
                            rowsPerPageOptions={[20]}
                        />
                    }
                </div>
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



export default connect(mapStateToProps)(Customer);