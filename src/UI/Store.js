import createStore from 'redux-zero';
import Gdpr from '../services/Gdpr';
let gdpr;
export default options => {
  if (gdpr === undefined) {
    gdpr = new Gdpr(options);
  }

  const initialState = {
    showModal: false,
    listService: gdpr.getListServices(),
    isFirstVisit: gdpr.isFirstVisit(),
  };

  const store = createStore(initialState);

  return store;
};
