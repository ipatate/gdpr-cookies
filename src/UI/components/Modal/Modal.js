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

  getStatusForType = (type: string): boolean | null => {
    const {listService} = this.props;
    const ok = [];
    const ko = [];
    listService.forEach(service => {
      if (service.type === type && service.state === true) {
        ok.push(service);
      } else if (service.type === type && service.state === false) {
        ko.push(service);
      }
    });
    let status = null;
    if (ok.length > 0 && ko.length === 0) {
      status = true;
    } else if (ok.length === 0 && ko.length > 0) {
      status = false;
    }
    return status;
  };

  getListElement = (): Array<any> => {
    const {listService, toggleServiceByType, t} = this.props;
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
            <BtActions
              t={t}
              // status={this.getStatusForType(service.type)}
              onChange={state => {
                return toggleServiceByType({type: service.type, state});
              }}
            />
          </div>,
        );
      }
      r.push(<ListElement key={service.name} t={t} service={service} />);
      type = service.type;
      return r;
    });
  };

  render() {
    const {showModal} = this.props;
    if (showModal === false) return null;
    const {t} = this.props;
    return (
      <div className="gdpr_modal">
        <div className="gdpr_modal_content">
          <div className="gdpr_modal_list">
            <header>
              <strong>{t('modal_header_txt')}</strong>
              <Button className="" onClick={this.closeAndSave}>
                <Close width="20px" height="20px" />
              </Button>
            </header>
            <div className="gdpr_modal_list-content">
              {this.getListElement()}
            </div>
          </div>
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
