import axios from 'axios';
// import {HOST} from '../host/portPath'
import {handleTimeOutSession} from "../interceptor/timeoutSession";

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const auth = window.localStorage.getItem('tokenAuth');
    if (auth) {
        config.headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth,
        };
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data( code 302)
  if(!JSON.parse(JSON.stringify(response)).data.code){
      handleTimeOutSession();
  }
    return response;
}, function (error) {
    if (error.toString() !== 'Error: Request failed with status code 401') {
        if (error.toString() !== 'Error: Request failed with status code 400') {
            if (error.toString() !== 'Error: Request failed with status code 401') {
                if (error.toString() !== 'Error: Request failed with status code 400') {
                    //window.location.href = "http://foo.com/error.php";
                    //shut down server
                    if(error.toString() === 'Error: Network Error'){
                        // window.localStorage.removeItem('admicroJwt');
                        // window.localStorage.removeItem('tokenAuth');
                        // //socialAccount
                        // window.localStorage.removeItem('socialAccount');
                        // handleTimeOutSession();
                       //window.location.href = "http://localhost:3000/error";
                    }else{
                       //window.location.href = "http://localhost:3000/error";
                    }
                }
            }
        }
    }
    // Do something with response error
    //return Promise.reject(error);
});

export const intercept = axios;