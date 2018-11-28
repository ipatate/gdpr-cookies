import Gdpr from './services/Gdpr';
import keys_api from './keys_api';

global.keys_api = keys_api;

// debugger;
const options = {
  keepCookies: [],
};

const gdpr = new Gdpr(options); // eslint-disable-line

// show popup
gdpr.isFirstVisit();

// gdpr.updateServiceByName('Google Tag', false);
gdpr.updateServiceByType('stats', false);

// active service allowed
gdpr.toggleService();

const services = gdpr.getListServices();

services.forEach(service => {
  console.log(service.name, service.type, service.state); // eslint-disable-line
});
