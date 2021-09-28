// @flow @jsx h
import {h} from 'preact';
import Switch from '../Switch';
import './style.css';

type BtActionsProps = {
  onChange: Function,
  showDisable: boolean,
  showChildren: boolean,
  t: Function,
  status: ?boolean,
  name: string,
  description: string,
};

const BtActions = ({
  onChange,
  t,
  status,
  showChildren,
  name,
}: BtActionsProps) => {
  const toggle = (val: boolean): void => {
    onChange(val);
  };
  return (
    <div class="gdpr_element-action">
      <Switch
        showChildren={showChildren}
        name={name}
        state={status}
        onChange={state => {
          toggle(state);
        }}
        t={t}
        className={``}
      >
        {status === false ? t('service_blocked') : t('service_activated')}
      </Switch>
    </div>
  );
};

BtActions.defaultProps = {
  onChange: () => true,
  showDisable: true,
  showChildren: true,
  name: '',
};

export default BtActions;
