import Vuex from 'vuex';
import Gdpr from '../services/Gdpr';

export const createStore = options => {
  const gdpr = new Gdpr(options);

  return new Vuex.Store({
    state: {
      listService: gdpr.getListServices(),
      isFirstVisit: gdpr.isFirstVisit(),
    },
    mutations: {},
  });
};
