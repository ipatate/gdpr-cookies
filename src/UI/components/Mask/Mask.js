// @flow @jsx h
import {h, Component} from 'preact';
import BtActions from '../BtActions';
import './style.scss';

type ListElementProps = {
  toggleServiceByName: Function,
  saveStateInGdpr: Function,
  service: {name: string, description?: string, type: string, state: boolean},
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
    const {service, toggleServiceByName, saveStateInGdpr} = this.props;
    const {name, state} = service;
    const t = this.translate;
    if (state === true) return null;
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
