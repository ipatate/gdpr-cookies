// @flow @jsx h
import {h, Component} from 'preact';
import Switch from '../Switch';
import './style.scss';

type BtActionsProps = {
  onChange: Function,
  showDisable: boolean,
  showChildren: boolean,
  t: Function,
  status: ?boolean,
  name: string,
};

export default class BtActions extends Component<BtActionsProps> {
  static defaultProps = {
    onChange: () => true,
    showDisable: true,
    showChildren: true,
    name: '',
  };

  toggle = (val: boolean): void => {
    const {onChange} = this.props;
    onChange(val);
  };

  render() {
    const {t, status, showChildren, name} = this.props;
    return (
      <div class="gdpr_element-action">
        <Switch
          showChildren={showChildren}
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
