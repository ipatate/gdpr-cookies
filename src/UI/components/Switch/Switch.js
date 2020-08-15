// @flow @jsx h
import {h, Fragment} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import {slugify} from '../../../utils/Slugify';
import './style.css';

type SwitchProps = {
  onChange: Function,
  t: Function,
  className: string,
  children: Node,
  showChildren: boolean,
  state: boolean,
  name: string,
};

const Switch = ({
  className,
  name,
  children,
  showChildren,
  onChange,
  state,
  t,
}: SwitchProps) => {
  const [_state, setState] = useState(state);
  const [slug, setSlug] = useState('');

  useEffect(() => {
    setSlug(slugify(name));
  }, []);

  useEffect(() => {
    setState(state);
  }, [state]);

  const _onChange = (e: Event) => {
    e.preventDefault();
    onChange(!_state);
  };
  return (
    <Fragment>
      <label for={slug} className={`gdpr_switch ${className}`}>
        <input
          id={slug}
          onChange={_onChange}
          checked={_state}
          type="checkbox"
        />
        <span
          className="gdpr_switch"
          aria-label={`${
            _state === false ? t('activate') : t('deactivate')
          } ${name}`}
          role="switch"
          aria-checked={_state}
        >
          <span className="gdpr_shadow" />
        </span>
        <span
          className={`gdpr_children ${_state === true ? 'switch_activated' : ''}
            ${showChildren === false ? 'gdpr_text_switch' : ''}`}
        >
          {children}
        </span>
      </label>
    </Fragment>
  );
};

Switch.defaultProps = {
  onChange: () => true,
  showChildren: true,
  className: '',
  state: false,
  name: '',
};

export default Switch;
