import {
    GET_LANGUAGE_SUCCESS
} from "../actions/languageManagement";

const INITIAL_STATE = {
    currentLanguage:null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_LANGUAGE_SUCCESS:
            return { ...state,
                currentLanguage:action.payload
            };
        default:
            return state;
    }
};