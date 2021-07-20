import { connect } from 'react-redux';
import Dashboard from '../../components/Overview/Dashboard';

const mapStateToProps = ({multiLanguage}) => {
    return {multiLanguage};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
