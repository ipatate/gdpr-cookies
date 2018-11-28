import {h, render} from 'preact';
import messages from '../locales/messages';
import {createStore} from './app/store';
import Banner from './app/components/Banner';

import keys_api from './keys_api';

global.keys_api = keys_api;

const options = {
  keepCookies: [],
};

createStore(options);

// language
let locale = window._gdpr_lang || 'en';
const t = string => messages[locale][string] || string;

render(<Banner t={t} />, document.body);

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
