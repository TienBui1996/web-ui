import { connect } from 'react-redux';
import Sidebar from '../../components/common/Sidebar';

const mapStateToProps = ({multiLanguage}) => {
    return {multiLanguage};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
