import { connect } from 'react-redux';
import Login from '../../components/authentication/Login';
import { logIn} from '../../actions/authentication_actions';

const mapStateToProps = ({ user}) => {
    return { user};
};

const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (credentials) => {
            dispatch(logIn(credentials));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
