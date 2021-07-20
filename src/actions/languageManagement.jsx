export const GET_LANGUAGE_SUCCESS = 'GET_LANGUAGE_SUCCESS';

function getLanguageSuccess(status) {
    return {
        payload: status,
        type: GET_LANGUAGE_SUCCESS
    };
}

export function getLanguage(status) {
    return(dispatch)=>{
        dispatch(getLanguageSuccess(status));
    }
}