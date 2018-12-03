import {connect} from 'redux-zero/preact';
import actions from '../../Actions';
import Banner from './Banner';

export default connect(
  null,
  actions,
)(Banner);
