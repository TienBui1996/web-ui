import Error from '../../components/error/Error';
import { connect } from 'react-redux';
const mapStateToProps = ({ user,multiLanguage}) => {
    return { multiLanguage};
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Error);
