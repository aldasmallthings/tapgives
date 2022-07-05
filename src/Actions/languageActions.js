
// ===================================---CHANGE LOGIN STATE---=======================================
// Updates language used
export const updateLanguageState = (payload) => {
    /*
        payload in shape:
        {
            code: "en",
            language: "English",
        }
     */
    // console.log(payload)
    return (dispatch) => {
        dispatch({ type: "SET_LANGUAGE", payload: payload });
    }
}
// Changes the stringed object (phrases)
export const updateStringsState = (payload) => {
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
    return (dispatch) => {
        dispatch({ type: "SET_STRINGS", payload: payload });
    }
}
// Changes the language bank
export const updateLanguageCodes = (payload) => {
    /*
        payload in shape:
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
    return (dispatch) => {
        dispatch({ type: "SET_LANGUAGE_CODES", payload: payload });
    }
}