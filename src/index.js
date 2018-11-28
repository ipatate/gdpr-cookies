import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import messages from '../locales/messages';
import {createStore} from './app/store';
import App from './app/components/app';

import keys_api from './keys_api';

Vue.use(Vuex);
Vue.use(VueI18n);

global.keys_api = keys_api;

// debugger;
const options = {
  keepCookies: [],
};

// eslint-disable-line

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

// init lang
let locale = window._gdpr_lang || navigator.language;
const i18n = new VueI18n({
  fallbackLocale: 'en',
  locale: locale,
  messages,
});

// init app
new Vue({
  store: createStore(options),
  i18n,
  el: '#gdpr-cookie',
  render: h => h(App),
});
