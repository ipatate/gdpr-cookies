// @flow @jsx h
import {h, Component} from 'preact';
import BtActions from '../BtActions';
import './style.scss';

type ListElementProps = {
  toggleServiceByName: Function,
  service: {name: string, description?: string, type: string, state: boolean},
  t: Function,
};

export default class ListElement extends Component<ListElementProps> {
  render() {
    const {t, service, toggleServiceByName} = this.props;
    const {name, description, state} = service;
    return (
      <div className="gdpr_liste_element">
        <div className="gdpr_liste_element-desc">
          <strong>{name}</strong>
          <p>{description}</p>
        </div>
        <BtActions
          status={state}
          onChange={state => {
            return toggleServiceByName({name: name, state});
          }}
          t={t}
        />
      </div>
    );
  }
}
