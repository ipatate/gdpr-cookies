// @flow
import CookieWrapper from './CookieWrapper';

export default class GrpdCookie {
  name: string;
  cookie: CookieWrapper;

  /**
   * @description constructor !
   * @param {object} options
   * @return {void}
   */
  constructor(name: string = 'grpd_cookie'): void {
    this.name = name;
    this.cookie = new CookieWrapper();
  }

  /**
   * @description get cookie with grpd settings
   * @return {string|void}
   */
  getCookie(): Object | void {
    const stringifyValue = this.cookie.get(this.name);
    return stringifyValue !== undefined
      ? JSON.parse(stringifyValue)
      : stringifyValue;
  }

  /**
   * @description update grpd setting in cookie
   * @param {string} value to insert in cookie
   * @return {string}
   */
  updateCookie(value: Object): ?string {
    const stringifyValue = JSON.stringify(value);
    return this.cookie.set(this.name, stringifyValue);
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
        this.cookie.remove(cookie);
      }
    }
  }
}
