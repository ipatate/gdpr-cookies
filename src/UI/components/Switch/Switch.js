// @flow @jsx h
import {h, Component} from 'preact';
import {slugify} from '../../../utils/Slugify';
import './style.scss';

type SwitchProps = {
  onChange: Function,
  className: string,
  children: Node,
  showChildren: boolean,
  state: boolean,
  name: string,
};

export default class Switch extends Component<SwitchProps> {
  static defaultProps = {
    onChange: () => true,
    showChildren: true,
    className: '',
    state: false,
    name: '',
  };

  slug: string = '';

  constructor(props: SwitchProps) {
    super(props);
    this.slug = slugify(props.name);
  }

  onChange = (e: Event) => {
    const {onChange, state} = this.props;
    e.preventDefault();
    const checked = !state;
    onChange(checked);
  };

  render() {
    const {className, children, showChildren, state} = this.props;

    return (
      <label for={this.slug} className={`gdpr_switch ${className}`}>
        <input
          id={this.slug}
          onChange={this.onChange}
          checked={state}
          type="checkbox"
        />
        <span
          className="gdpr_switch"
          title={children}
          aria-label={children}
          role="switch"
          aria-checked={state}
        >
          <span className="gdpr_shadow" />
        </span>
        {showChildren === true ? (
          <span
            className={`gdpr_children ${
              state === true ? 'switch_activated' : ''
            }`}
          >
            {children}
          </span>
        ) : null}
      </label>
    );
  }
}
