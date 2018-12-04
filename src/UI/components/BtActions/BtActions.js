// @flow @jsx h
import {h, Component} from 'preact';
import Button from '../Button';
import './style.scss';

type BtActionsProps = {
  onChange: ?Function,
  t: Function,
  status: ?boolean,
};

export default class BtActions extends Component<BtActionsProps> {
  static defaultProps = {
    onChange: () => true,
  };

  toggle = (val: boolean): void => {
    const {onChange} = this.props;
    if (onChange) onChange(val);
  };

  render() {
    const {status, t} = this.props;
    return (
      <div class="gdpr_element-action">
        <Button
          onClick={e => {
            e.preventDefault();
            this.toggle(true);
          }}
          className={`gdpr_btn-round ${
            status === true ? 'gdpr_btn-success' : 'gdpr_btn-default'
          }`}
        >
          {t('service_accept')}
        </Button>
        <Button
          onClick={e => {
            e.preventDefault();
            this.toggle(false);
          }}
          className={`gdpr_btn-round ${
            status === false ? 'gdpr_btn-error' : 'gdpr_btn-default'
          }`}
        >
          {t('service_bloc')}
        </Button>
      </div>
    );
  }
}
