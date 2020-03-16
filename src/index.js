// @flow @jsx h
// polyfill for fucking old browser !
import 'core-js/stable/array/from';
import 'core-js/stable/array/find';
import 'core-js/stable/object/assign';
import 'core-js/stable/symbol';
import 'core-js/stable/map';
import 'core-js/stable/set';

import {h, render} from 'preact';
import {Provider} from 'redux-zero/preact';
import initStore from './UI/Store';
import messagesDefault from '../locales/messages';
import App from './UI/App';
import {createMask} from './UI/Mask';

// language
// const locale = window._gdpr_lang || 'en';
const options = window._gdpr_options || {};
const messages = window._gdpr_messages || messagesDefault;

// target element
const target = document.getElementById('gdpr-cookie');

// init app
const main = (locale: string) => {
  const _locale = locale || window._gdpr_lang || 'en';
  if (target) {
    const store = initStore(options, _locale, messages);
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      target,
    );
    createMask(store);
  }
};

// set to window
global.initGdprCookie = main;

// export for npm user
export default main;

// change lang
global.changeLangGdpr = locale => {
  if (target) {
    target.innerHTML = '';
  }
  main(locale);
};
