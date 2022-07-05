import './App.css';
import React, {useRef, useEffect, useState, Component} from 'react';
import Login from "./Components/Authentication/Login_material";
import PageContainer from "./Views/PageContainer/PageContainer";
import { connect } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import {updateLoginState} from "./Actions/loginActions";
import {StylesProvider, ThemeProvider} from '@material-ui/core/styles';
import {Hub} from "aws-amplify";
import theme from "./themes";


function App(props) {
    const {loginState, updateLoginState} = props;

    const [currentLoginState, updateCurrentLoginState] = useState(loginState);


    useEffect(() => {
        setAuthListener();
    }, []);

    useEffect(() => {
        updateCurrentLoginState(loginState);
    }, [loginState]);


    async function setAuthListener() {
        Hub.listen('auth', (data)=> {
            switch(data.payload.event) {
                case "signOut":
                    updateLoginState("signIn");
                    break;
                default:
                    break;
            }
        })
    }


    return (
        <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
                <div style={{width: "100vw", height: "100vh"}}>
                    {
                        currentLoginState !== "signedIn" && (
                            /* Login component options:
                            *
                            * [logo: "custom", "none"]
                            * [type: "video", "image", "static"]
                            * [themeColor: "standard", "#012144" (color hex value in quotes) ]
                            *  Suggested alternative theme colors: #037dad, #5f8696, #495c4e, #4f2828, #ba8106, #965f94
                            * [animateTitle: true, false]
                            * [title: string]
                            * [darkMode (changes font/logo color): true, false]
                            * [disableSignUp: true, false]
                            * */
                            <Login logo={"custom"} type={"image"} themeColor={"standard"} animateTitle={true}
                                   title={"TapGives Challenge"} darkMode={true}
                                   disableSignUp={false}
                            />
                        )
                    }
                    {
                        currentLoginState === "signedIn" && (
                            <BrowserRouter>
                                <PageContainer />
                            </BrowserRouter>
                        )
                    }
                </div>
            </ThemeProvider>
        </StylesProvider>
    );
}

const mapStateToProps = (state) => {
    return {
        loginState: state.loginState.currentState,
    };
};

const mapDispatchToProps = {
    updateLoginState,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
