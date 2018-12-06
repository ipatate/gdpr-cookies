// @flow @jsx h
import {h, Component} from 'preact';
import BtActions from '../BtActions';
import './style.scss';

type ListElementProps = {
  toggleServiceByName: Function,
  saveStateInGdpr: Function,
  service: {name: string, description?: string, type: string, state: boolean},
  listService: ServiceList,
  messages: Object,
  locale: string,
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

  render() {
    const {
      service,
      listService,
      toggleServiceByName,
      saveStateInGdpr,
    } = this.props;
    const t = this.translate;
    const {name} = service;
    // find service for update
    const serviceState = listService.find(service => service.name === name);
    if (!serviceState || serviceState.state === true) return null;
    const {state} = serviceState;
    return (
      <div className="gdpr_mask-content">
        <div className="gdpr_mask-desc">
          {t(`mask_text_start`)}
          {` ${name} `}
          {t(`mask_text_end`)}
        </div>
        <BtActions
          status={state}
          onChange={state => {
            toggleServiceByName({name: name, state});
            saveStateInGdpr();
          }}
          t={t}
        />
      </div>
    );
  }
}
