import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Perfection from '../components/Perfection';

function mapStateToProps(state) {
  return {
    user: state.perfection.user,
  };
}

export default connect(mapStateToProps)(Perfection);
