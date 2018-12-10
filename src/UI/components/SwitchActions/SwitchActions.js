// @flow @jsx h
import {h, Component} from 'preact';
import Switch from '../Switch';
import './style.scss';

type BtActionsProps = {
  onChange: Function,
  showDisable: boolean,
  t: Function,
  status: ?boolean,
  name: string,
};

export default class BtActions extends Component<BtActionsProps> {
  static defaultProps = {
    onChange: () => true,
    showDisable: true,
    name: '',
  };

  toggle = (val: boolean): void => {
    const {onChange} = this.props;
    onChange(val);
  };

  render() {
    const {t, status, name} = this.props;
    return (
      <div class="gdpr_element-action">
        <Switch
          name={name}
          state={status}
          onChange={state => {
            this.toggle(state);
          }}
          className={``}
        >
          {status === false ? t('service_blocked') : t('service_activated')}
        </Switch>
      </div>
    );
  }
}
