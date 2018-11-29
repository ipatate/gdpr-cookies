import {h, Component} from 'preact';
import './style.scss';

export class Button extends Component {
  defaultProps = {
    onClick: () => true,
  };
  render() {
    return (
      <button
        className={`gdpr_btn ${this.props.className}`}
        onClick={this.props.onClick}
      >
        {this.props.text}
      </button>
    );
  }
}

export default Button;
