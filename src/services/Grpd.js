// @flow
import merge from 'deepmerge';
import GrpdCookie from './GrpdCookie';

export default class Grpd {
  options: OptionsGrpd = {
    name: 'grpd_cookie',
    keepCookies: ['plop'],
    types: ['ads', 'stats'],
  };
  cookie: GrpdCookie;
  activated: Object;

  /**
   * @description constructor !
   * @param {object} options
   * @return {void}
   */
  constructor(options: ?OptionsGrpd = {name: 'grpd_cookie'}): void {
    this.options = merge.all([this.options, options]);
    this.cookie = new GrpdCookie(this.options.name);
    // init activated object and save in cookie
    this.initCookie();
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

  /**
   * @description init cookie settings if not exist
   * @return {void}
   */
  initCookie(): void {
    const _c = this.cookie.getCookie();
    const value = this.createActivatedObject(_c);
    this.cookie.updateCookie(value);
  }

  /**
   * @description create object activated with old value if exist
   * @param {object | void} _c
   * @return {object}
   */
  createActivatedObject(_c: Object | void): Object {
    const {types} = this.options;
    // old value in cookie if exist
    const oldActivated = _c !== undefined ? _c : {};
    const newActivated = {};
    // if type is array
    if (types !== undefined && Array.isArray(types)) {
      types.forEach(name => {
        // old value or true by default
        newActivated[name] =
          oldActivated[name] !== undefined ? oldActivated[name] : true;
      });
    }
    this.activated = newActivated;
    return this.activated;
  }
}
