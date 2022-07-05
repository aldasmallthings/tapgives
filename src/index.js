import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import awsExports from "./aws-exports";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import reducers from "./Reducers";
import Amplify from 'aws-amplify';

Amplify.configure(awsExports);

const enhancers = compose(applyMiddleware(thunk))
const store = createStore(
    reducers, enhancers
);


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
