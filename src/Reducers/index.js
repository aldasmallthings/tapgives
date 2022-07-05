import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import appStateReducer from "./appStateReducer";
import languageReducer from "./languageReducer";

export default combineReducers({
    loginState: loginReducer,
    appState: appStateReducer,
    languageState: languageReducer,
});