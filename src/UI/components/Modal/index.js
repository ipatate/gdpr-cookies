import Modal from './Modal';
import {connect} from 'redux-zero/preact';
import actions from '../../Store/Actions';

const mapToProps = ({showModal, listService}) => ({showModal, listService});

export default connect(
  mapToProps,
  actions,
)(Modal);
