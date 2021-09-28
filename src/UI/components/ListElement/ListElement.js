// @flow @jsx h
import {h} from 'preact';
import SwitchActions from '../SwitchActions';
import './style.css';

type ListElementProps = {
  toggleServiceByName: Function,
  service: {name: string, description?: string, type: string, state: boolean},
  t: Function,
};

const ListElement = ({t, service, toggleServiceByName}: ListElementProps) => {
  const {name, description, state} = service;
  return (
    <div
      className={`gdpr_list_element ${
        state === true
          ? 'gdpr_list_element-activate'
          : 'gdpr_list_element-disabled'
      }`}
    >
      <div className="gdpr_list_element-title">
        <strong>{name}</strong>
        <SwitchActions
          name={name}
          status={state}
          showChildren={false}
          onChange={state => {
            return toggleServiceByName({name, state});
          }}
          t={t}
        />
      </div>
      {description ? (
        <div className="gdpr_list_element-desc">
          <p>{description}</p>
        </div>
      ) : null}
    </div>
  );
};

export default ListElement;
