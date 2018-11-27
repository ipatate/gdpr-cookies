// @flow
import merge from 'deepmerge';
import GdprCookie from './GdprCookie';
import GdprObservable from './GdprObservable';
import {validGdprArray} from '../utils/Validator';

export default class Gdpr {
  options: OptionsGdpr = {
    name: 'gdpr_cookie',
    keepCookies: ['plop'],
    types: ['ads', 'stats', 'others'],
  };
  GdprObservable: GdprObservable;
  cookie: GdprCookie;
  activated: Map<string, boolean>;
  cookieExist: boolean = true;
  globalGdpr: ObserverGdpr;

  /**
   * @description constructor !
   * @param {object} options
   * @return {void}
   */
  constructor(options: ?OptionsGdpr = {name: 'gdpr_cookie'}): void {
    this.options = merge.all([this.options, options]);
    this.cookie = new GdprCookie(this.options.name);
    // stock name of service and bool for active or not
    this.activated = new Map();
    // stock global service generated in html
    this.globalGdpr = this.getGlobalGdpr();
    // init activated object and save in cookie
    this.initCookie();
    // service callback observer
    this.GdprObservable = new GdprObservable(
      this.globalGdpr,
      this.options.types,
    );
  }

  /**
   * @description get global _gdpr array and freeze for bloc modification
   * @return {array}
   */
  getGlobalGdpr(): ObserverGdpr {
    const _gdpr =
      global._gdpr !== undefined && Array.isArray(global._gdpr)
        ? global._gdpr
        : [];
    const validGdpr = this.validGlobalGdpr(_gdpr);
    return Object.freeze(validGdpr);
  }

  /**
   * @description valid global gdpr array
   * @param {Object} globalGdpr
   * @return {Object} globalGdpr
   */
  validGlobalGdpr(globalGdpr: ObserverGdpr): ObserverGdpr {
    const {types} = this.options;
    // if type is array
    if (types !== undefined && Array.isArray(types)) {
      return globalGdpr.filter(service => validGdprArray(service, types));
    }
    return [];
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

  isFirstVisit(): boolean {
    return this.cookieExist;
  }

  /**
   * @description each activated for active or unactive service
   * @return {void}
   */
  activeService(): void {
    for (const key of this.activated.keys()) {
      const value = this.activated.get(key);
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
    this.cookieExist = _c.size === 0;
    if (this.cookieExist) {
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
   * @description create map activated with old value if exist
   * @param {object} _c
   * @return {object}
   */
  createActivatedObject(_c: Map<string, boolean>): Object {
    const services = this.globalGdpr;

    services.forEach(service => {
      const {name} = service[0];
      const old = _c.get(name);
      this.activated.set(name, old !== undefined ? old : true);
    });
    return this.activated;
  }

  /**
   * @description get list of service by type and name
   */
  getListServices(): ServiceList {
    return this.globalGdpr.map(service => {
      const {name, description, type} = service[0];
      const state = this.activated.get(name);
      return {
        name,
        description: description || '',
        type: type,
        state: state || true,
      };
    });
  }

  /**
   * @description update activated Map
   */
  updateActivated() {}
}
