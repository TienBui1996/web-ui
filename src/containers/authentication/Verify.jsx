import { connect } from 'react-redux';
import Verify from '../../components/authentication/Verify';
import {verifyAccount} from '../../actions/authentication_actions';

const mapStateToProps = ({ user}) => {
    return { user};
};

const mapDispatchToProps = (dispatch) => {
    return {
        verifyAccount: (otp) => {
            dispatch(verifyAccount(otp));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Verify);

