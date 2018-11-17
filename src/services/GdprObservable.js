// @flow
import {createScript} from '../utils/CallbackBase';

class GdprObservable {
  observers: ObservableGdpr = {};
  typesAllowed: Array<string> = [];

  /**
   *
   * @param {array} observerGdpr
   * @param {array} typesAllowed
   * @return {void}
   */
  constructor(
    observerGdpr: ObserverGdpr = [],
    typesAllowed: Array<string> = [],
  ): void {
    this.typesAllowed = typesAllowed;
    this.setObservers(observerGdpr);
  }

  /**
   * @description create observer object with type for key and array of callback in value
   * @param {array} cb
   * @return {void}
   */
  setObservers(observerGdpr: ObserverGdpr): void {
    observerGdpr.forEach(o => {
      // if array and has 3 elements
      if (Array.isArray(o) === true && o.length > 2) {
        if (
          typeof o[0] === 'string' &&
          typeof o[1] === 'string' &&
          typeof o[2] === 'function'
        ) {
          const key = o[0];
          // type is allowed
          if (this.typesAllowed.indexOf(key) > -1) {
            // create array if not exist for this key
            this.observers[key] =
              this.observers[key] !== undefined ? this.observers[key] : [];
            const func = o[2];
            this.observers[key].push(func);
          }
        }
      }
    });
  }

  /**
   * @description launch all cb with type in argument
   * @param {string} type
   * @return {void}
   */
  active(type: string): void {
    if (this.observers[type] !== undefined) {
      this.observers[type].forEach(observer => observer(createScript));
    }
  }
}

export default GdprObservable;
