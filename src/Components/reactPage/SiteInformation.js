import React from "react";
import {API, Auth} from "aws-amplify";
import {Site} from "../../models";
import "./SiteInformation.css"
import Grid from "@material-ui/core/Grid";
import {
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow, TextField
} from "@material-ui/core";
import theme from "../../themes";
import * as PropTypes from "prop-types";
import AdministrationBackendHelper from "../Helpers/AdministrationBackendHelper";
import MapComponent from "./MapComponent";
import * as queries from "../../graphql/queries";
import {connect} from "react-redux";
import {DataGrid} from "@mui/x-data-grid";
import Chart from "react-apexcharts";
import DatePicker from '@mui/lab/DatePicker';
import {LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {Stack} from "@mui/material";

function ThemeProvider(props) {
    return null;
}

ThemeProvider.propTypes = {
    theme: PropTypes.any,
    children: PropTypes.node
};

class SiteInformation extends React.Component {
    constructor(props) {
        super(props)
        const siteRequirements = [
            {
                id: "name",
                label: this.props.strings.siteName,
                xs: 12,
                processor: (input)=>(input),
            },
            {
                id: "id",
                label: "id",
                xs: 12,
                processor: (input)=>(input),
            },
            {
                id:"description",
                label: this.props.strings.description,
                xs: 12,
                processor: (input)=>(input),
            },
            {
                id:"currentSubscribers",
                label: this.props.strings.siteCustomers,
                xs: 12,
                processor: (input)=>(input),
            },
            {
                id:"smsDescription",
                label: this.props.strings.smsDescription,
                xs: 12,
                processor: (input)=>(input),
            },
            {
                id: "nickname",
                label: this.props.strings.nickname,
                xs: 4,
                processor: (input)=>(input),
            },
            {
                id: "serviceRadius",
                label: this.props.strings.serviceRadius,
                xs: 4,
                processor: (input)=>(input),
            },
            {
                id: "latitude",
                label: this.props.strings.latitude,
                xs: 4,
                processor: (input)=>(input),
            },
            {
                id: "longitude",
                label: this.props.strings.longitude,
                xs: 4,
                processor: (input)=>(input),
            },
            {
                id: "avgWaitMinute",
                label: this.props.strings.avgWaitMinute,
                xs: 4,
                processor: (input)=>(input),
            },
            {
                id: "avgLineCount",
                label: this.props.strings.avgLineCount,
                xs: 4,
                processor: (input)=>(input),
            },
            {
                id: "subscriptionFee",
                label: this.props.strings.subscriptionFee,
                xs: 4,
                processor: (input)=>(input),
            },
            {
                id: "expectedJerrycans",
                label: this.props.strings.expectedJerrycans,
                xs: 4,
                processor: (input)=>(input),
            },
        ]
        const columns = [
            {
                field: "fullName",
                headerName: props.strings.fullName,
                flex: 1,
            },
            {
                field: "userPhoneNumber",
                headerName: props.strings.phoneNumber,
                flex: 1,
            },
            {
                field: "action",
                headerName: props.strings.action,
                flex: 1,
            },
            {
                field: "status",
                headerName: props.strings.status,
                flex: 1,
            },
            {
                field: "collectedCount",
                headerName: props.strings.collectedItemCount,
                flex:1,
            },
            {
                field: "collectedItemType",
                headerName: props.strings.collectedItemType,
                flex:1,
            },
        ]
        const {siteID} = props

        this.state = {
            siteID: siteID,
            site: null,
            siteData: {},
            rows: [],
            siteRequirements: siteRequirements,
            athenaLoaded: false,
            columns: columns,
            nextToken: null,
            series: [{
                name: "Visitors",
                data: []
            }],
            options: {
                chart: {
                    height: 400,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: this.props.strings.recentVisits,
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: [...Array(24).keys()],
                }
            },
            date: new Date(),
        }
    }
    async componentDidMount() {
        this.setState({
            siteData: await AdministrationBackendHelper.getSite(this.state.siteID),
            // rows: await AdministrationBackendHelper.getTransactionsBySite(this.state.siteID),
        })
        this.callAthenaUpdate()
    }
    async callAthenaUpdate() {
        this.setState({
            athenaLoaded:false
        })
        //console.log(this.state.date.getMonth())
        //console.log(this.state.date)
        let data = (await API.graphql({
            query: queries.athenaCall,
            // Day and
            variables: {
                siteName: this.state.siteData.name,
                year: parseInt(this.state.date.getFullYear()),
                month: parseInt(this.state.date.getMonth())+1, //date returns index 0, and athena uses index 1
                day: -1,
                hour: -1,
            }
        })).data.athenaCall
        // Athena call returns a string seperated by \n for rows, and , for columns.  All values are in strings
        // After processing will be in the shape [[hour, visits], [hour, visits]]
        let split = (data.split('\n'))
        split.pop() // last row is just an empty row, this removes it
        split.shift() // first row is just column names. this removes it
        for (let row in split) {
            // processing of rows
            split[row] = split[row].replaceAll('"',"") // Removes all quotes
            split[row] = split[row].split(",").map((num)=>(parseInt(num))) // Converts entries to numbers, instead of strings
        }
        split.sort((item0, item1)=>(item0[0]-item1[0])) // Ensures the hours are in order, for better processing later
        //console.log(split)
        if (split.length !== 0) {
            let index = 0
            let graphData = []
            // Entering either the visits during each hour, or zero if there was none
            for (let hour = 0; hour < 24; hour++) {
                if (index < split.length && split[index][0] === hour) {
                    graphData.push(split[index][1])
                    index++
                } else {
                    graphData.push(0)
                }
            }
            this.setState({
                series: [
                    {
                        name: this.props.strings.visitors,
                        data: graphData
                    }
                ],
            })
            //console.log(this.state.graphData)
        } else {
            //console.log("No athena data")
            this.setState({
                series: [
                    {
                        name: this.props.strings.visitors,
                        data: [],
                    }
                ],
            })
        }
        this.setState({athenaLoaded: true})
    }
    render(){
        return(
            <Grid container direction={"row"} spacing={1} >
                <Grid item xs={12} md={6}>
                    <Paper >
                        <div style ={{width: "100%", height: "800px", overflowY: "scroll"}}>
                            <TableContainer>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" colSpan="100%" >
                                                <div class="title">
                                                    {this.props.strings.siteInformation}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.siteRequirements.map((key) => (
                                            <TableRow>
                                                <TableCell>{key.label}</TableCell>
                                                <TableCell>{this.state.siteData[key.id]}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </Paper>

                </Grid>
                <Grid item xs={12} md={6} >
                    <Paper>
                        <Stack >
                            {
                                !this.state.athenaLoaded?
                                    <CircularProgress/>:
                                    this.state.series[0].data.length===0?
                                        <div>No Information</div>:
                                        <Chart options={this.state.options} series={this.state.series} type="line" height={350} />
                            }
                            {/*<Chart options={this.state.options} series={this.state.series} type="line" height={350} />*/}
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label={this.props.strings.yearAndMonth}
                                    openTo="month"
                                    views={["year","month"]}
                                    minDate={new Date(Date.UTC(this.state.date.getFullYear()-4, 0, 0, 0, 0, 0))}
                                    maxDate={new Date(Date.UTC(this.state.date.getFullYear()+4, 0, 0, 0, 0, 0))}
                                    value={this.state.date}
                                    onChange={(newValue) => {
                                        //console.log(newValue)
                                        this.setState(
                                            {date: newValue},
                                                this.callAthenaUpdate
                                            )
                                    }}
                                    renderInput={(params) => <TextField {...params} helperText={null} />}
                                />
                            </LocalizationProvider>
                            <MapComponent siteID = {this.state.siteID}/>
                        </Stack>

                    </Paper>
                </Grid>
                {/*<Grid item container xs = {12} direction={"column"}>*/}
                {/*    <Grid item container >*/}

                {/*    </Grid>*/}
                {/*    <Grid item>*/}
                {/*        <Paper>*/}
                {/*            <div style={{ height: "800px", width: '100%'}}>*/}
                {/*                <DataGrid*/}
                {/*                    columns = {this.state.columns}*/}
                {/*                    rows = {this.state.rows}*/}
                {/*                    autoPageSize*/}
                {/*                />*/}
                {/*            </div>*/}
                {/*        </Paper>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}
            </Grid>


        )

    }
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



export default connect(mapStateToProps)(SiteInformation);