import {
    AUTH_API,
    COMMON_API,
    STATISTIC_API
} from '../host/portPath';
import { API_VERSION } from "../version/apiVersion";

//used for authentication
export const LOGIN_URL = AUTH_API + "/" + API_VERSION + "/account/login";
export const REGISTER_URL = AUTH_API + "/" + API_VERSION + "/account/register";
export const VERIFY_URL = AUTH_API + "/" + API_VERSION + "/account/verify";
