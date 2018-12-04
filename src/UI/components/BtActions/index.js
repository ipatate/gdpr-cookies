import {connect} from 'redux-zero/preact';
import actions from '../../Store/Actions';
import BTActions from './BtActions';

export default connect(
  null,
  actions,
)(BTActions);
