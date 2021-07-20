import Home from '../../components/common/Home';
import { connect } from 'react-redux';

import {verifyAccount, validateToken} from "../../actions/authentication_actions";

const mapStateToProps = ({ user,multiLanguage,userManagement,campaignManagement,searchData,groupManagement}) => {
    return { user,multiLanguage,userManagement,campaignManagement,searchData};
};

const mapDispatchToProps = (dispatch) => {
    return {
        verifyAccount: (otp) => {
            dispatch(verifyAccount(otp));
        },
        validateToken:(jwt)=>{
            dispatch(validateToken(jwt));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
