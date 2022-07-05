import React from "react";
import {Auth} from "aws-amplify";
import AdministrationBackendHelper from "../Helpers/AdministrationBackendHelper";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import {Paper, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import SiteInformation from "./SiteInformation";
import "./SiteManagement.css"

class siteManagement extends React.Component {

    constructor(props) {
        super(props)
        //extracts the /siteManagement/[siteID]
        const url = window.location.pathname
        const siteID = url.substring(16)
        this.state = {
            sites: [],
            siteID:siteID,
        }
    }
    async componentDidMount() {
        let id = "";
        try {
            const site = await AdministrationBackendHelper.getSite(this.state.siteID)
            if (site == null)
                throw new Error("No Site found")
        } catch (e) {
            //console.log(e)
            id = (await Auth.currentAuthenticatedUser()).attributes.sub;
            const sites = await AdministrationBackendHelper.getSitesBySiteManager(id)
            if (sites.length === 0) {
                // this.setState
            }
            else {
                this.props.history.push('/siteManagement/'+sites[0].id)
                this.setState({siteID:sites[0].id})
            }
        }
        if (id == "")
            id = (await Auth.currentAuthenticatedUser()).attributes.sub;
        this.setState({
            sites: await AdministrationBackendHelper.getSitesBySiteManager(id)
        })
    }

    render() {
        return (
            <Grid container>
                <Grid item xs={12} md={2}>
                    <Paper>
                        <div style={{ height: "800px", width: '100%', overflowY: "scroll"}}>
                            <Table>
                                <TableHead>
                                    <TableCell align={"center"} >
                                        <div class="title">{this.props.strings.sites}</div>
                                    </TableCell>
                                </TableHead>
                                <TableBody sx={{overflowY: "scroll"}}>
                                    {this.state.sites.map((site)=>(
                                        <TableRow hover  >
                                            <TableCell onClick={()=>{
                                                this.props.history.push('/siteManagement/'+site.id)
                                                this.setState({siteID:site.id})
                                                window.location.reload()
                                            }}>
                                                <div><b>{site.name}</b>{" ("+site.nickname+')'}</div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md = {10} id="siteInfo">
                        {(this.state.siteID!="")?<SiteInformation siteID={this.state.siteID} />:null}
                </Grid>
            </Grid>

        );
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



export default connect(mapStateToProps)(siteManagement);