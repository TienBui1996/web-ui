import { connect } from 'react-redux';
import ConfirmResetPassword from '../../components/authentication/ConfirmResetPassword';

const mapStateToProps = ({user}) => {
    return {user};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmResetPassword);
