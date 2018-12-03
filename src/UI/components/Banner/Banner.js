// @flow @jsx h
import {h, Component} from 'preact';
import Button from '../Button';
import './style.scss';

export default class Banner extends Component<AppProps> {
  closeAndSave = (): void => {
    const {toggleModal, toggleBanner} = this.props;
    toggleBanner(false);
    toggleModal(false);
  };

  render() {
    if (this.props.isFirstVisit === false) return null;
    const {t, toggleModal} = this.props;
    return (
      <div className="gdpr_banner">
        <div className="gdpr_banner-text">{t('alert_text')}</div>
        <Button
          className="gdpr_btn-success"
          onClick={e => {
            e.preventDefault();
            this.closeAndSave();
          }}
        >
          {t('banner_ok_bt')}
        </Button>
        <Button
          className="gdpr_btn-default"
          onClick={e => {
            e.preventDefault();
            toggleModal(true);
          }}
        >
          {t('banner_custom_bt')}
        </Button>
      </div>
    );
  }
}
