import {
    combineReducers
} from 'redux';
import userReduce from '../reducers/user_auth';
import multipleLanguage from '../reducers/multi_language';

const increment = (state = 0, action) => {
    return state + 1;
};
export default combineReducers({
    state: increment,
    user: userReduce,
    multiLanguage:multipleLanguage
});
