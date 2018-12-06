import Mask from './Mask';
import {connect} from 'redux-zero/preact';
import actions from '../../Store/Actions';

const mapToProps = ({showModal, listService, messages, locale}) => ({
  showModal,
  listService,
  messages,
  locale,
});

export default connect(
  mapToProps,
  actions,
)(Mask);
