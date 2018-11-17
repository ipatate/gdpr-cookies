// @flow
import merge from 'deepmerge';
import GdprCookie from './GdprCookie';
import GdprObservable from './GdprObservable';

export default class Gdpr {
  options: OptionsGdpr = {
    name: 'gdpr_cookie',
    keepCookies: ['plop'],
    types: ['ads', 'stats'],
  };
  GdprObservable: GdprObservable;
  cookie: GdprCookie;
  activated: Object;

  /**
   * @description constructor !
   * @param {object} options
   * @return {void}
   */
  constructor(options: ?OptionsGdpr = {name: 'gdpr_cookie'}): void {
    this.options = merge.all([this.options, options]);
    this.cookie = new GdprCookie(this.options.name);
    // init activated object and save in cookie
    this.initCookie();
    this.GdprObservable = new GdprObservable(
      this.getGlobalGdpr(),
      this.options.types,
    );
  }

  /**
   * @description get global _gdpr array
   * @return {array}
   */
  getGlobalGdpr(): ObserverGdpr {
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
        this.GdprObservable.active(key);
      }
    }
  }

  /**
   * @description init cookie settings if not exist
   * @return {void}
   */
  initCookie(): void {
    const _c = this.cookie.getCookie();
    // if not cookie rgpd clear cookie
    if (_c === undefined) {
      this.clearCookies();
    }
    // create cookie object
    const value = this.createActivatedObject(_c);
    // save
    this.cookie.updateCookie(value);
  }

  /**
   * @description clear cookie
   * @return {void}
   */
  clearCookies(): void {
    this.cookie.removeAll(this.options.keepCookies);
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
