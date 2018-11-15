// @flow
import merge from 'deepmerge';
import Cookie from './utils/Cookie';
class Grpd {
  options: OptionsGrpd = {
    name: 'grpd_cookie',
    keepCookies: ['plop'],
    types: ['ads', 'stats'],
  };
  cookie: CookieObject;

  /**
   * @description constructor !
   * @param {object} options
   * @return {void}
   */
  constructor(options: ?OptionsGrpd = {}): void {
    this.options = merge.all([this.options, options]);
    this.cookie = new Cookie();
    this.initCookie();
  }

  /**
   * @description init cookie settings if not exist
   * @return {void}
   */
  initCookie(): void {
    const _c = this.getCookie();
    if (_c === undefined) {
      const value = this.createValueCookie();
      this.updateCookie(value);
    }
  }

  /**
   * @description get cookie with grpd settings
   * @return {string|void}
   */
  getCookie(): ?string {
    const {name} = this.options;
    const stringifyValue = this.cookie.get(name);
    if (stringifyValue !== undefined) {
      return JSON.parse(stringifyValue);
    }
    return stringifyValue;
  }

  /**
   * @description update grpd setting in cookie
   * @param {string} value to insert in cookie
   * @return {string}
   */
  updateCookie(value: Object): string {
    const {name} = this.options;
    const stringifyValue = JSON.stringify(value);
    return this.cookie.set(name, stringifyValue);
  }

  /**
   * @description create object with name from types options
   * @return {object}
   */
  createValueCookie(): Object {
    const {types} = this.options;
    const _return = {};
    if (types !== undefined && Array.isArray(types)) {
      types.forEach(name => {
        _return[name] = false;
      });
    }
    return _return;
  }

  /**
   * @description get value in options by name
   * @param {string} name
   * @return {void}
   */
  getOption(name: string): void {
    if (this.options[name] !== undefined) {
      return this.options[name];
    }
    return undefined;
  }
}

export default Grpd;
