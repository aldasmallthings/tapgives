import LocalizedStrings from "react-localization";
import LocalizationHelper from "../Components/Helpers/LocalizationHelper";
const strings = new LocalizedStrings(LocalizationHelper.getLanguagePhrasesFast())
strings.setLanguage(LocalizationHelper.getLanguage().code)
const initialState = {
    code: LocalizationHelper.getLanguage().code,
    language: LocalizationHelper.getLanguage().language,
    strings : strings,
    /*
        shape:
            {
                en: {
                    signIn:"Sign In",
                    email:"Email",
                    ...
                },
                sw: {
                    ...
                }
            }
     */
    languageCodes: LocalizationHelper.getLanguageCodesFast(),
    /*
        shape:
        [
            {
                id: "en",
                language: "English,
            },
            {
                id: "sw",
                language: "Swahili",
            },
        ]
     */
};


const languageReducer = (currentState = initialState, action) => {
    let newState = currentState;
    // console.log(action)
    switch(action.type) {
        /*
            payload in shape:
            {
                code: "en",
                language: "English",
            }
        */
        case "SET_LANGUAGE": {
            const strings = newState.strings
            strings.setLanguage(action.payload.code)
            LocalizationHelper.setLanguage(action.payload.code, action.payload.language)
            // console.log(action.payload)
            return {
                ...newState,
                code: action.payload.code,
                language: action.payload.language,
                strings: strings
            }
        }
        /*
        payload in shape:
            {
                en: {
                    signIn:"Sign In",
                    email:"Email",
                    ...
                },
                sw: {
                    ...
                }
            }
         */
        case "SET_STRINGS": {
            const strings = new LocalizedStrings(action.payload)
            strings.setLanguage(newState.code)
            return {
                ...newState,
                strings: strings
            }
        }
        /*
            shape:
            [
                {
                    id: "en",
                    language: "English,
                },
                {
                    id: "sw",
                    language: "Swahili",
                },
            ]
         */
        case "SET_LANGUAGE_CODES": {
            return {
                ...newState,
                languageCodes: action.payload,
            }
        }
        default:
            return newState

    }
}

export default languageReducer;