// @flow @jsx h
import {h, Component} from 'preact';
import './style.scss';

type BtProps = {
  onClick: ?Function,
  t: Function,
  className: string,
  children: Node,
};
export default class Button extends Component<BtProps> {
  defaultProps = {
    onClick: () => true,
  };
  render() {
    const {className, onClick, children} = this.props;
    return (
      <button className={`gdpr_btn ${className}`} onClick={onClick}>
        {children}
      </button>
    );
  }
}
