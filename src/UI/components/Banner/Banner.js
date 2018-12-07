// @flow @jsx h
import {h, Component} from 'preact';
import Button from '../Button';
import './style.scss';

export default class Banner extends Component<AppProps> {
  closeAndSave = (): void => {
    const {toggleModal, toggleBanner, saveStateInGdpr} = this.props;
    toggleBanner(false);
    toggleModal(false);
    saveStateInGdpr();
  };

  render() {
    const {showBanner} = this.props;
    if (showBanner === false) return null;
    const {t, toggleModal, toggleBanner} = this.props;
    return (
      <div className="gdpr_banner">
        <div className="gdpr_banner-content">
          <div className="gdpr_banner-text">{t('alert_text')}</div>
          <div className="gdpr_banner-actions">
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
                toggleBanner(false);
              }}
            >
              {t('banner_custom_bt')}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
