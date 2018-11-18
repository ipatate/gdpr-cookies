// @flow
import * as helpers from '../utils/CallbackBase';

class GdprObservable {
  observers: ObservableGdpr;
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
    this.observers = new Map();
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
      if (Array.isArray(o) === true && o.length > 1) {
        if (typeof o[0] === 'object' && typeof o[1] === 'function') {
          const desc = o[0];
          const func = o[1];
          const {name, type} = desc;
          // type is allowed
          if (
            type !== undefined &&
            name !== undefined &&
            this.typesAllowed.indexOf(type) > -1
          ) {
            // create Set if not exist for this key
            if (this.observers.has(type) === false) {
              this.observers.set(type, new Set([]));
            }
            const temp = this.observers.get(type);
            if (temp) temp.add(func);
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
    if (this.observers.has(type)) {
      const funcSet = this.observers.get(type);
      if (funcSet) {
        funcSet.forEach(observer => observer(helpers));
      }
    }
  }
}

export default GdprObservable;
