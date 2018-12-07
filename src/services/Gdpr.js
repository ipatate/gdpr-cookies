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
    // in days
    expires: 395,
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
    this.GdprObservable = new GdprObservable(this.globalGdpr);
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

  updateCookie(): void {
    this.cookie.updateCookie(this.activated, this.options.expires);
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
    this.createActivatedObject(_c);
    // save
    // this.updateCookie();
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
    const arr = this.globalGdpr.map(service => {
      const {name, description, type} = service[0];
      const state = this.activated.get(name);
      return {
        name,
        description: description || '',
        type: type,
        state: state !== undefined ? state : true,
      };
    });
    // sort by type
    return arr.sort((a, b) => {
      if (a.type < b.type) return -1;
      else if (a.type > b.type) return 1;
      return 0;
    });
  }

  /**
   * @description update activated Map by name
   * @param {string} name
   * @param {boolean} state
   * @return { void }
   */
  updateServiceByName(name: string, state: boolean): void {
    if (this.activated.has(name) && typeof state === 'boolean') {
      this.activated.set(name, state);
    }
  }

  /**
   * @description update activated Map by type
   * @param {string} type
   * @param {boolean} state
   * @return { void }
   */
  updateServiceByType(typeOfService: string, state: boolean): void {
    this.globalGdpr.forEach(service => {
      const {name, type} = service[0];
      if (typeOfService === type && typeof state === 'boolean') {
        this.activated.set(name, state);
      }
    });
  }

  /**
   * @param {ServiceList} previousState compare with old state
   * @description each activated for active or unactive service
   * @return {void}
   */
  toggleService(
    previousState: ?ServiceList,
    isFirstVisit: boolean = false,
  ): void {
    for (const key of this.activated.keys()) {
      let oldValue = false;
      if (previousState) {
        const oldState = previousState.find(service => service.name === key);
        oldValue = oldState ? oldState.state : false;
      }
      const value = this.activated.get(key);
      // if is first visit active service
      if (
        (value === true && oldValue === false) ||
        (value === true && isFirstVisit === true)
      ) {
        this.GdprObservable.active(key);
      }
    }
  }
}
