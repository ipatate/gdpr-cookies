// @flow
import typeof Cookie from 'js-cookie';
import JSCookie from 'js-cookie';

class CookieWrapper {
  cookie: Cookie;

  constructor() {
    this.cookie = JSCookie;
  }
  /**
   * @description get all cookies
   * @return {object}
   */
  getAll(): Object {
    return this.cookie.get();
  }

  /**
   * @description get cookie by name
   * @param {string} name
   * @return {string | void}
   */
  get(name: string): string | void {
    return this.cookie.get(name);
  }

  /**
   * @description set cookie by name and value
   * @param {string} name
   * @param {string} value
   * @return {void}
   */
  set(name: string, value: string, expires: ?number): void {
    let options = {};
    if (expires) options = {expires};
    return this.cookie.set(name, value, options);
  }

  /**
   * @description remove cookie by name
   * @param {string} name
   * @return {void}
   */
  remove(name: string): void {
    return this.cookie.remove(name);
  }
}

export default CookieWrapper;
