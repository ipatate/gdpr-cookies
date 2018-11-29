import {h, Component} from 'preact';
import {connect} from 'redux-zero/preact';
import actions from '../../Actions';
import Button from '../Button/Button';
import './style.scss';

export class Modal extends Component {
  render() {
    if (this.props.showModal === false) return null;
    return (
      <div className="gdpr_modal">
        <div className="gdpr_modal-list">{this.props.t('alert_text')}</div>

        <Button
          className="gdpr_btn-success"
          text={this.props.t('modal_valid')}
        />
      </div>
    );
  }
}
const mapToProps = ({showModal}) => ({showModal});

export default connect(
  mapToProps,
  actions,
)(Modal);
