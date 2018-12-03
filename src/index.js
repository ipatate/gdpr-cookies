// @flow @jsx h
import {h, render} from 'preact';
import {Provider} from 'redux-zero/preact';
import initStore from './UI/Store';
import messages from '../locales/messages';
import App from './UI/App';
import keys_api from './keys_api';

global.keys_api = keys_api;

const options = {
  keepCookies: [],
};

// language
const locale = window._gdpr_lang || 'en';

const main = locale => {
  const target = document.getElementById('gdpr-cookie');
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

// gdpr.updateServiceByName('Google Tag', false);
// gdpr.updateServiceByType('stats', false);

// active service allowed
// gdpr.toggleService();
