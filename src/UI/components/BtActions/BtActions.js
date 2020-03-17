// @flow @jsx h
import {h} from 'preact';
import Button from '../Button';
import './style.scss';

type BtActionsProps = {
  onChange: ?Function,
  showDisable: boolean,
  t: Function,
  status: ?boolean,
};

const BtActions = ({status, t, onChange, showDisable}: BtActionsProps) => {
  const toggle = (val: boolean): void => {
    if (onChange) onChange(val);
  };

  return (
    <div class="gdpr_element-action">
      {showDisable === true ? (
        <Button
          onClick={e => {
            e.preventDefault();
            toggle(false);
          }}
          className={`gdpr_btn-round ${
            status === false ? 'gdpr_btn-error' : 'gdpr_btn-default'
          }`}
        >
          {t('service_bloc_all')}
        </Button>
      ) : (
        ''
      )}
      <Button
        onClick={e => {
          e.preventDefault();
          toggle(true);
        }}
        className={`gdpr_btn-round ${
          status === true ? 'gdpr_btn-success' : 'gdpr_btn-default'
        }`}
      >
        {t('service_accept_all')}
      </Button>
    </div>
  );
};
BtActions.defaultProps = {
  onChange: () => true,
  showDisable: true,
};

export default BtActions;
