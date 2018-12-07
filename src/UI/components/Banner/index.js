import {connect} from 'redux-zero/preact';
import actions from '../../Store/Actions';
import Banner from './Banner';

const mapToProps = ({showBanner}) => ({
  showBanner,
});

export default connect(
  mapToProps,
  actions,
)(Banner);
