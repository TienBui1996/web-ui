import axios from 'axios';
import Errors from '../constants/errors';
import jwtDecode from 'jwt-decode';
import qs from 'query-string';

import { LOGIN_URL, REGISTER_URL, VERIFY_URL } from '../api/UrlApi'

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESSS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const TOKEN_VALIDATION_SUCCESS = 'TOKEN_VALIDATION_SUCCESS';
export const VERIFY_SUCCESS = 'VERIFY_SUCCESS';
export const VERIFY_FAIL = 'VERIFY_FAIL';


function loginRequest (){
    return {
        type: LOGIN_REQUEST
    }
}
function loginFailure(error) {
    return {
        payload: error,
        type: LOGIN_FAILURE
    };
}

function loginSuccess(user) {
    return {
        payload: user,
        type: LOGIN_SUCCESS
    };
}

function registerSuccess(user) {
    return {
        payload: user,
        type: REGISTER_SUCCESS
    };
}

function registerFailure(user) {
    return {
        payload: user,
        type: REGISTER_FAILURE
    };
}
function registerRequest() {
    return {
        type: REGISTER_REQUEST
    };
}


function verifySuccess() {
    return {
        type: VERIFY_SUCCESS
    };
}
function verifyFail() {
    return {
        type: VERIFY_FAIL
    };
}


export function logIn(credentials) {
    return (dispatch) => {
        dispatch(loginRequest());
        var bodyFormData = new FormData();
        bodyFormData.set('email', credentials.email);
        bodyFormData.set('password', credentials.password);
        axios.post(LOGIN_URL, qs.stringify(credentials)).then(response => {
            if (response.data.code === 200) {
                const tokenDecode = jwtDecode(response.data.successObject.token);
                window.localStorage.setItem('admicroJwt', tokenDecode.sub);//save object
                window.localStorage.setItem('accountId', JSON.parse(tokenDecode.sub).id);
                const tokenAuth = response.data.successObject.token;
                window.localStorage.setItem('tokenAuth', tokenAuth);
                dispatch(loginSuccess(tokenDecode.sub));
            }
            else{
                dispatch(loginFailure({ message: Errors.INVALID_CREDENTIAlS }));
            }
        }).catch(error => {
            console.log("Exception after logging system" + error.message);
            dispatch(loginFailure({ message: Errors.INVALID_CREDENTIAlS }));
        })
    };
}

function tokenValidationSuccess(user) {
    return {
        type: TOKEN_VALIDATION_SUCCESS,
        payload: user
    };
}
//
export function validateToken(jwt) {
    return (dispatch) => {
        const user = jwt;
        dispatch(tokenValidationSuccess(JSON.stringify(user)));
    };
}
export function logOutSuccess() {
    return {
        type: LOGOUT_REQUEST,
        payload: null
    };
}
//registerUser
export function registerUser(user) {
    return (dispatch) => {
        dispatch(registerRequest());
        axios.post(REGISTER_URL, {
            address: user.address,
            email: user.email,
            name: user.name,
            password: user.password,
            phone: user.phone,
            company: user.company
        }).then(response => {
            if (response.data.code === 200) {
                dispatch(registerSuccess(response.data.successObject.success));
            }
        }).catch(error => {
            dispatch(registerFailure({ message: 'Email has been used' }));
        })

    };
}

export function verifyAccount(otp) {
    return (dispatch) => {
        axios.get(VERIFY_URL, {
            params: {
                otp: otp
            }
        }).then(function (response) {
            if (response.data.code === 200) {
                dispatch(verifySuccess());
            }
        }).catch(function (error) {
            dispatch(verifyFail());
        });

    };
}
//
export function logOut() {
    return (dispatch) => {
        dispatch(logOutSuccess());
    }
}
