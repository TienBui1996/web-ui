import
{
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    TOKEN_VALIDATION_SUCCESS,
    REGISTER_SUCCESS,REGISTER_FAILURE,
    REGISTER_REQUEST,VERIFY_SUCCESS,
    VERIFY_FAIL
} from '../actions/authentication_actions';

const INITIAL_STATE = {
    validating: false,
    requesting: false,
    error: null,
    data: null,
    logOut:false,
    register:null,
    requestingLogin:false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, requesting: false ,logOut:false,register:null,requestingLogin:true,error:null};
        case LOGIN_FAILURE:
            return { ...state, requesting: false, error: action.payload,logOut:false ,register:null,requestingLogin:false};
        case LOGIN_SUCCESS:
        {
            return {...state, requesting: false, data: action.payload,error:null,logOut:false,register:null,requestingLogin:false};
        }
        case LOGOUT_REQUEST:
            return { ...state, data: null,logOut:true,register:null,requestingLogin:false};
        case REGISTER_SUCCESS:
            return { ...state, data: null,requesting:false,error:null,logOut:false,register:"success",requestingLogin:false};
        case REGISTER_FAILURE:
            return { ...state, data:null,error:action.payload,requesting:true,logOut:false,register:"failed",requestingLogin:false};
        case REGISTER_REQUEST:
            return {...state,data:null,error:null,requesting:true,logOut:false,register:null,requestingLogin:false};
        case TOKEN_VALIDATION_SUCCESS:
            return { ...state, data: action.payload, validating: false,logOut:false,register:null,requestingLogin:false};
        case VERIFY_SUCCESS:
            return { ...state, requesting: false, error: null,logOut:false ,register:'verifySuccess',requestingLogin:false};
        case VERIFY_FAIL:
            return { ...state, requesting: false, error: null,logOut:false ,register:'verifyFail',requestingLogin:false};
        default:
            return state;
    }
};