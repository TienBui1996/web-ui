import { connect } from 'react-redux';
import FinishResetPassword from '../../components/authentication/FinishResetPassword';

const mapStateToProps = ({user}) => {
    return {user};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FinishResetPassword);
