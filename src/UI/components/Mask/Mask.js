// @flow @jsx h
import {h} from 'preact';
import Button from '../Button';
import './style.css';

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

const Mask = ({
  messages,
  locale,
  service,
  listService,
  isFirstVisit,
  toggleServiceByName,
  toggleModal,
  toggleBanner,
  saveStateInGdpr,
}: ListElementProps) => {
  const t = (string: string) => {
    if (
      messages === undefined ||
      locale === undefined ||
      messages[locale] === undefined
    )
      return string;
    return messages[locale][string] || string;
  };

  const onChange = (name: string, state: boolean): void => {
    toggleServiceByName({name: name, state});
    saveStateInGdpr();

    if (isFirstVisit === true) {
      toggleModal(false);
      toggleBanner(false);
    }
  };

  const {name} = service;
  // find service for update
  const serviceState = listService.find(service => service.name === name);
  if (
    !serviceState ||
    (serviceState.state === true && isFirstVisit === false)
  ) {
    return null;
  }
  return (
    <div className="gdpr_mask-content">
      <div className="gdpr_mask-desc">
        {t(`mask_text_start`)}
        {` ${name} `}
        {t(`mask_text_end`)}
      </div>
      <div className="gdpr_mask-action">
        <Button
          onClick={e => {
            e.preventDefault();
            onChange(name, true);
          }}
          className="gdpr_btn-round gdpr_btn-success"
        >
          {t('service_accept')}
        </Button>
      </div>
    </div>
  );
};

export default Mask;
