// @flow @jsx h
import {h, render} from 'preact';
import {Provider} from 'redux-zero/preact';
import initStore from './UI/Store';
import messagesDefault from '../locales/messages';
import App from './UI/App';

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
    render(
      <Provider store={initStore(options)}>
        <App locale={locale} messages={messages} />
      </Provider>,
      target,
    );
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
