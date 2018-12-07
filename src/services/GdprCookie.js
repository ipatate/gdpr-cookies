// @flow
import CookieWrapper from './CookieWrapper';

export default class GdprCookie {
  name: string;
  cookie: CookieWrapper;

  /**
   * @description constructor !
   * @param {object} options
   * @return {void}
   */
  constructor(name: string = 'gdpr_cookie'): void {
    this.name = name;
    this.cookie = new CookieWrapper();
  }

  /**
   * @description get cookie with gdpr settings
   * @return {Map}
   */
  getCookie(): Map<string, boolean> {
    const stringifyValue = this.cookie.get(this.name);
    const value = stringifyValue !== undefined ? stringifyValue : '[]';
    return new Map(JSON.parse(value));
  }

  /**
   * @description update gdpr setting in cookie
   * @param {Map} value to insert in cookie
   * @return {string}
   */
  updateCookie(value: Map<string, boolean>, expires: ?number): ?string {
    const stringifyValue = JSON.stringify([...value]);
    return this.cookie.set(this.name, stringifyValue, expires);
  }

  /**
   * @description remove cookie exclude name in cookie array and name of cookie rgpd
   * @param {array} keepCookie
   * @return {void}
   */
  removeAll(keepCookie: Array<string> = []): void {
    const cookies = this.cookie.getAll();
    for (const cookie in cookies) {
      if (keepCookie.indexOf(cookie) === -1 && cookie !== this.name) {
        // domain
        const hostCplt = window.location.hostname;
        // remove sub domain
        const host = location.hostname
          .split('.')
          .slice(-2)
          .join('.');
        // remove without domain
        this.cookie.remove(cookie, {
          path: '/',
        });
        // remove with domain complete
        this.cookie.remove(cookie, {
          path: '/',
          domain: hostCplt,
        });
        // remove with domain without subdomain
        this.cookie.remove(cookie, {
          path: '/',
          domain: host,
        });
      }
    }
  }
}
