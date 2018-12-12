// @flow @jsx h
import {h, Component} from 'preact';
import Button from '../Button';
import ListElement from '../ListElement';
import BtActions from '../BtActions';
import Close from './close.svg';
import Arrow from './arrow-left.svg';
import './style.scss';

export default class Modal extends Component<AppProps> {
  closeAndSave = (e: Event): void => {
    e.preventDefault();
    const {toggleModal, saveStateInGdpr} = this.props;
    toggleModal(false);
    saveStateInGdpr();
  };

  getListElement = (): Array<any> => {
    const {listService, t} = this.props;
    let type = '';
    return listService.map(service => {
      let r = [];
      if (service.type !== type) {
        r.push(
          <div key={service.type} class="gdpr_modal_list-head">
            <div className="gdpr_modal_list-head-text">
              <Arrow width="24px" height="24px" />
              {t(service.type)}
            </div>
          </div>,
        );
      }
      r.push(<ListElement key={service.name} t={t} service={service} />);
      type = service.type;
      return r;
    });
  };

  render() {
    const {showModal, toggleAllService} = this.props;
    if (showModal === false) return null;
    const {t} = this.props;
    return (
      <div role="dialog" aria-modal="true" className="gdpr_modal">
        <div className="gdpr_modal_content">
          <div className="gdpr_modal_head">
            <div className="gdpr_modal_head-content">
              <header>
                <strong>{t('modal_header_txt')}</strong>
                <Button className="" onClick={this.closeAndSave}>
                  <Close width="20px" height="20px" />
                </Button>
              </header>
            </div>
            <div className="gdpr_modal_button-all">
              <BtActions
                t={t}
                onChange={state => {
                  return toggleAllService(state);
                }}
              />
            </div>
          </div>
          <div className="gdpr_modal_list-content">{this.getListElement()}</div>
          <div className="gdpr_modal_action">
            <Button className="gdpr_btn-success" onClick={this.closeAndSave}>
              {t('modal_valid')}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
