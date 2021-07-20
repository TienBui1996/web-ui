import { connect } from 'react-redux';
import ForgetPassword from '../../components/authentication/ForgetPassword';

const mapStateToProps = ({user}) => {
    return {user};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
