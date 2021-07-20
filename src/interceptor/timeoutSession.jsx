import {HOST} from "../host/portPath";

export function handleTimeOutSession(){
    window.localStorage.removeItem('admicroJwt');
    window.localStorage.removeItem('organizationManagement');
    window.localStorage.removeItem('socialAccount');
    window.localStorage.removeItem('tokenAuth');
    window.localStorage.removeItem('accountId');
    window.location.href = HOST;
}