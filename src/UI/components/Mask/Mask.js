// @flow @jsx h
import {h, Component} from 'preact';
import BtActions from '../BtActions';
import './style.scss';

type ListElementProps = {
  toggleServiceByName: Function,
  saveStateInGdpr: Function,
  toggleModal: Function,
  toggleBanner: Function,
  service: {name: string, description?: string, type: string, state: boolean},
  listService: ServiceList,
  messages: Object,
  locale: string,
  isFirstVisit: boolean,
};

export default class Mask extends Component<ListElementProps> {
  translate = (string: string) => {
    const {messages, locale} = this.props;
    if (
      messages === undefined ||
      locale === undefined ||
      messages[locale] === undefined
    )
      return string;
    return messages[locale][string] || string;
  };

  onChange = (name: string, state: boolean): void => {
    const {
      toggleServiceByName,
      toggleModal,
      toggleBanner,
      saveStateInGdpr,
      isFirstVisit,
    } = this.props;
    toggleServiceByName({name: name, state});
    saveStateInGdpr();

    if (isFirstVisit === true) {
      toggleModal(false);
      toggleBanner(false);
    }
  };

  render() {
    const {service, listService, isFirstVisit} = this.props;
    const t = this.translate;
    const {name} = service;
    // find service for update
    const serviceState = listService.find(service => service.name === name);
    if (
      !serviceState ||
      (serviceState.state === true && isFirstVisit === false)
    ) {
      return null;
    }
    const {state} = serviceState;
    return (
      <div className="gdpr_mask-content">
        <div className="gdpr_mask-desc">
          {t(`mask_text_start`)}
          {` ${name} `}
          {t(`mask_text_end`)}
        </div>
        <BtActions
          showDisable={false}
          status={state}
          onChange={state => this.onChange(name, state)}
          t={t}
        />
      </div>
    );
  }
}
