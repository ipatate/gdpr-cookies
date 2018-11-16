// @flow
import merge from 'deepmerge';
import GrpdCookie from './GrpdCookie';
import GrpdObservable from './GrpdObservable';

export default class Grpd {
  options: OptionsGrpd = {
    name: 'grpd_cookie',
    keepCookies: ['plop'],
    types: ['ads', 'stats'],
  };
  GrpdObservable: GrpdObservable;
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
    this.GrpdObservable = new GrpdObservable(
      this.getGlobalGrpd(),
      this.options.types,
    );
    this.activeService();
  }

  /**
   * @description get global _gdpr array
   * @return {array}
   */
  getGlobalGrpd(): ObserverGrpd {
    const _gdpr = global._gdpr || [];
    return _gdpr;
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
   * @description each activated for active or unactive service
   * @return {void}
   */
  activeService(): void {
    for (const key in this.activated) {
      const value = this.activated[key];
      if (value === true) {
        this.GrpdObservable.active(key);
      }
    }
  }

  /**
   * @description clear cookie if cookie gdpr not exist
   * @param {object|void} _c
   * @return {void}
   */
  clearCookies(_c: Object | void): void {
    if (_c === undefined) {
      this.cookie.removeAll(this.options.keepCookies);
    }
  }

  /**
   * @description init cookie settings if not exist
   * @return {void}
   */
  initCookie(): void {
    const _c = this.cookie.getCookie();
    this.clearCookies(_c);
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
          oldActivated[name] !== undefined ? oldActivated[name] : false;
      });
    }
    this.activated = newActivated;
    return this.activated;
  }
}
