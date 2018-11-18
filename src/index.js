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
// active service allowed
// gdpr.activeService();
// debugger;
