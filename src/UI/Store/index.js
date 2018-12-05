// @flow
import createStore from 'redux-zero';

import Gdpr from '../../services/Gdpr';
let gdpr;
export default (options: ?OptionsGdpr) => {
  if (gdpr === undefined) {
    gdpr = new Gdpr(options);
  }
  const isFirstVisit = gdpr.isFirstVisit();

  // active service allowed if already visited site
  if (isFirstVisit === false) {
    // active service allowed
    gdpr.toggleService();
  }

  const initialState: StoreType = {
    gdpr: gdpr,
    showModal: false,
    // previous state list service for compare on save
    prevListService: gdpr.getListServices(),
    listService: gdpr.getListServices(),
    isFirstVisit,
  };

  const store = createStore(initialState);

  // if first visit detect click change page or action
  if (isFirstVisit === true) {
    listenClick(store);
  }
  // set global method for change setting cookie with click on link
  global.showModal = () => {
    store.setState({showModal: true});
  };

  return store;
};

// listen click on page for accept on first visit
const listenClick = store => {
  const {gdpr} = store.getState();
  // target a and button
  const a = document.getElementsByTagName('a');
  const button = document.getElementsByTagName('button');
  const arrayOfA = a ? Array.from(a) : [];
  const arrayOfButton = button ? Array.from(button) : [];
  [...arrayOfA, ...arrayOfButton].forEach(val => {
    val.addEventListener('click', () => {
      // active service
      gdpr.toggleService();
      // save cookie
      gdpr.updateCookie();
      // close all
      store.setState({
        showModal: false,
        isFirstVisit: false,
      });
    });
  });
};
