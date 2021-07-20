import { connect } from 'react-redux';
import Register from '../../components/authentication/Register';
import {registerUser} from '../../actions/authentication_actions';

const mapStateToProps = ({ user}) => {
    return { user};
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (credentials) => {
            dispatch(registerUser(credentials));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
