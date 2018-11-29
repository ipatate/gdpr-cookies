import {h, Component} from 'preact';
import {connect} from 'redux-zero/preact';
import actions from '../../Actions';
import Button from '../Button/Button';
import './style.scss';

export class Banner extends Component {
  render() {
    // if (this.props.store.isFirstVisit === false) return null;
    return (
      <div className="gdpr_banner">
        <div className="gdpr_banner-text">{this.props.t('alert_text')}</div>
        <Button
          className="gdpr_btn-success"
          text={this.props.t('banner_ok_bt')}
        />
        <Button
          className="gdpr_btn-default"
          onClick={e => {
            e.preventDefault();
            this.props.toggleModal(true);
          }}
          text={this.props.t('banner_custom_bt')}
        />
      </div>
    );
  }
}

export default connect(
  null,
  actions,
)(Banner);
