import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { Route, Switch, useHistory} from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from "../../Components/Navbar/Navbar";
import { connect } from "react-redux";
import {updateMenuState} from "../../Actions/menuActions";
import MapComponent from '../../Components/reactPage/MapComponent'
import siteManagement from '../../Components/reactPage/SiteManagement'
import Administration from '../../Components/reactPage/Administration'
import DataStoreTest from '../../Components/reactPage/DataStoreTest'
import SiteInformation from "../../Components/reactPage/SiteInformation";
import SiteCustomers from "../../Components/reactPage/SiteCustomers";
import LanguageAdministration from "../../Components/reactPage/LanguageAdministration";
import Customer from "../../Components/reactPage/Customer";
import AdministrationBackendHelper from "../../Components/Helpers/AdministrationBackendHelper";
import {Auth} from "aws-amplify";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    drawer: {
        width: 240,
        flexShrink: 0,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    drawerPaper: {
        width: 240,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));


function PageContainer(props) {
    const { menuEnabled, updateMenuState, strings } = props;
    const classes = useStyles();
    const history = useHistory();
    const [admin, setAdmin] = useState(false);
    useEffect(async ()=> {
        const user =  await Auth.currentAuthenticatedUser();
        const groups = user.signInUserSession.accessToken.payload["cognito:groups"]
        if (groups.includes("Admins"))
            setAdmin(true)
        // Get customer info and query by their phone number
    },[])
    /*
    * Handles closing side menu if an event occurs
    * */
    const handleSideMenuClose = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        updateMenuState(false);
    }


    {/* Example side menu is provided below */}
    const list = () => (
        <div
            className={classes.drawerContainer}
            onClick={handleSideMenuClose(false)}
            onKeyDown={handleSideMenuClose(false)}
        >
            <List>
                <ListItem button key={"home"} onClick={() => history.push("/siteManagement")}>
                    <ListItemIcon><HomeIcon/></ListItemIcon>
                    <ListItemText primary={strings.home}/>
                </ListItem>
                <ListItem button key={"siteCustomers"} onClick={() => history.push("/SiteCustomers")}>
                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                    <ListItemText primary={strings.siteCustomers} />
                </ListItem>
                {
                    admin?
                        <div>
                            <ListItem button key={"administration"} onClick={() => history.push("/Administration")}>
                                <ListItemIcon><DashboardIcon/></ListItemIcon>
                                <ListItemText primary={strings.administration}/>
                            </ListItem>
                            <ListItem button key={"languageAdministration"} onClick={() => history.push("/languageAdministration")}>
                                <ListItemIcon><DashboardIcon /></ListItemIcon>
                                <ListItemText primary={strings.languageAdministration} />
                            </ListItem>
                            {/*This is supposed to be for dev only, if you see it, you probably have no access to any of the tools*/}
                            {/*<ListItem button key={"dataStoreTest"} onClick={() => history.push("/dataStoreTest")}>*/}
                            {/*    <ListItemIcon><DashboardIcon /></ListItemIcon>*/}
                            {/*    <ListItemText primary={"DataStore Test"} />*/}
                            {/*</ListItem>*/}
                        </div>:
                        null
                }
            </List>
            <Divider/>
        </div>
    );

    return(<Grid container>
        {/* Navbar component, set side menu button parameter -->
        button updates redux state to show/hide left sidebar */}
        <Navbar showSideMenuButton={true} />
        {/* App content example below with sidebar */}
        {/* Side menu component */}
        <Drawer
            anchor={'left'} open={menuEnabled} onClose={handleSideMenuClose}
            style={{zIndex: 0}}
            classes={{
                paper: classes.drawerPaper,
            }}
            ModalProps={{ onBackdropClick: handleSideMenuClose() }}
        >
            <Toolbar />
            {/* Side menu items added for rendering */}
            {list()}
        </Drawer>
        <main className={classes.content}>
            {/* Routes are added here if you need multiple page views. otherwise this Switch can be deleted and replaced
            with your app's contents */}
            <Switch>
                <Route exact path={"/"} component={siteManagement} />
                <Route exact path={"/home"} component={siteManagement} />
                <Route path={"/siteManagement"} component={siteManagement} />
                <Route exact path={"/Administration"} component={Administration} />
                <Route exact path={"/dataStoreTest"} component={DataStoreTest} />
                <Route exact path={"/languageAdministration"} component={LanguageAdministration}/>
                <Route path={"/siteInformation"} component={SiteInformation} />
                <Route path={"/siteCustomers"} component={SiteCustomers} />
                <Route path={"/customer"} component={Customer}/>
            </Switch>
        </main>
    </Grid>)
}

const mapStateToProps = (state) => {
    return {
        menuEnabled: state.appState.showSideBar,
        strings: state.languageState.strings,
    };
};

const mapDispatchToProps = {
    updateMenuState,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);