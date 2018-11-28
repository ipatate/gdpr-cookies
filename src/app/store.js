import Gdpr from '../services/Gdpr';
let gdpr;
export const createStore = options => {
  if (gdpr === undefined) {
    gdpr = new Gdpr(options);
  }

  return {
    listService: gdpr.getListServices(),
    isFirstVisit: gdpr.isFirstVisit(),
  };
};
