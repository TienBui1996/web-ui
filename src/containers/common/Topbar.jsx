import { connect } from 'react-redux';
import Topbar from '../../components/common/Topbar';
import {logOut} from '../../actions/authentication_actions';
import {
    getLanguage
} from "../../actions/languageManagement";


const mapStateToProps = ({ user,userManagement,notify,multiLanguage}) => {
    return { user,userManagement,notify,multiLanguage};
};

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => {
            dispatch(logOut());
        },
        getLanguage:(status)=>{
            dispatch(getLanguage(status))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
