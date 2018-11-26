// @flow
import * as helpers from '../utils/CallbackBase';
import {validGdprArray} from '../utils/Validator';
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
        if (validGdprArray(o, this.typesAllowed)) {
          const {name} = o[0];
          const func = o[1];
          // create Set if not exist for this key
          if (this.observers.has(name) === false) {
            this.observers.set(name, new Set([]));
          }
          const temp = this.observers.get(name);
          if (temp) temp.add(func);
        }
      }
    });
  }

  /**
   * @description launch all cb with name in argument
   * @param {string} name
   * @return {void}
   */
  active(name: string): void {
    if (this.observers.has(name)) {
      const funcSet = this.observers.get(name);
      if (funcSet) {
        funcSet.forEach(observer => observer(helpers));
      }
    }
  }
}

export default GdprObservable;
