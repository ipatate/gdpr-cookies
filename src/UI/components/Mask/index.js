import Mask from './Mask';
import {connect} from 'redux-zero/preact';
import actions from '../../Store/Actions';

const mapToProps = ({
  showModal,
  isFirstVisit,
  listService,
  messages,
  locale,
}) => ({
  showModal,
  isFirstVisit,
  listService,
  messages,
  locale,
});

export default connect(
  mapToProps,
  actions,
)(Mask);
