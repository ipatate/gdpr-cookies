// @flow @jsx h
import {h} from 'preact';
import './style.scss';

type BtProps = {
  onClick: ?Function,
  className: string,
  children: Node,
  'aria-label': ?string,
};
const Button = (props: BtProps) => {
  const {className, onClick, children} = props;
  return (
    <button
      aria-label={props['aria-label'] ? props['aria-label'] : null}
      className={`gdpr_btn ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  onClick: () => true,
  className: '',
  'aria-label': null,
};
export default Button;
