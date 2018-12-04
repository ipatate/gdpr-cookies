import {connect} from 'redux-zero/preact';
import actions from '../../Store/Actions';
import Banner from './Banner';

export default connect(
  null,
  actions,
)(Banner);
