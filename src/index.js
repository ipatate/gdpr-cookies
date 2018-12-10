// @flow @jsx h
// polyfill for fucking old browser !
import 'core-js/fn/array/from';
import 'core-js/fn/array/find';
import 'core-js/fn/object/assign';
import 'core-js/es6/symbol';
import 'core-js/es6/map';
import 'core-js/es6/set';

import {h, render} from 'preact';
import {Provider} from 'redux-zero/preact';
import initStore from './UI/Store';
import messagesDefault from '../locales/messages';
import App from './UI/App';
import {createMask} from './UI/Mask';

if (process.env.NODE_ENV === 'development') {
  const keys_api = require('./keys_api').default;

  global.keys_api = keys_api;
}

// language
const locale = window._gdpr_lang || 'en';
const options = window._gdpr_options || {};
const messages = window._gdpr_messages || messagesDefault;

// target element
const target = document.getElementById('gdpr-cookie');

// init app
const main = locale => {
  if (target) {
    const store = initStore(options, locale, messages);
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      target,
    );
    createMask(store);
  }
};

main(locale);

// change lang
global.changeLangGdpr = locale => {
  if (target) {
    target.innerHTML = '';
  }
  main(locale);
};
