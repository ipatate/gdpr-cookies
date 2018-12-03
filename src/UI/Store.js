// @flow
import createStore from 'redux-zero';

import Gdpr from '../services/Gdpr';
let gdpr;
export default (options: OptionsGdpr) => {
  if (gdpr === undefined) {
    gdpr = new Gdpr(options);
  }

  const initialState: StoreType = {
    showModal: false,
    listService: gdpr.getListServices(),
    isFirstVisit: gdpr.isFirstVisit(),
  };

  const store = createStore(initialState);

  return store;
};
