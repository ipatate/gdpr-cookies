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
  render(
    <Provider store={initStore(options)}>
      <App locale={locale} messages={messages} />
    </Provider>,
    document.getElementById('gdpr-cookie'),
  );
};

main(locale);

// show popup
// gdpr.isFirstVisit();

// gdpr.updateServiceByName('Google Tag', false);
// gdpr.updateServiceByType('stats', false);

// active service allowed
// gdpr.toggleService();

// const services = gdpr.getListServices();

// services.forEach(service => {
//   console.log(service.name, service.type, service.state); // eslint-disable-line
// });
