// @flow @jsx h
import {h, Component} from 'preact';
import './style.scss';

type SwitchProps = {
  onClick: Function,
  className: string,
  children: Node,
  state: boolean,
};

export default class Switch extends Component<SwitchProps> {
  static defaultProps = {
    onClick: () => true,
    className: '',
    state: false,
  };

  onChange = (e: Event) => {
    const {onClick} = this.props;
    e.preventDefault();
    // $FlowFixMe
    const checked = !this.state.checked;
    onClick(checked);
    // $FlowFixMe
    this.setState({checked});
  };

  render() {
    const {className, children} = this.props;
    // $FlowFixMe
    const {checked} = this.state;
    return (
      <label className={`gdpr_switch ${className}`}>
        <input onChange={this.onChange} checked={checked} type="checkbox" />
        <span>{children}</span>
      </label>
    );
  }
}
