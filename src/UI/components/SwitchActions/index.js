import {connect} from 'redux-zero/preact';
import actions from '../../Store/Actions';
import SwitchActions from './SwitchActions';

export default connect(
  null,
  actions,
)(SwitchActions);
