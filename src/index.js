import Gdpr from './services/Gdpr';
import keys_api from './keys_api';

global.key = keys_api;

// debugger;
const options = {
  keepCookies: ['tarteaucitron', 'test'],
};

const gdpr = new Gdpr(options); // eslint-disable-line

// active service allowed
gdpr.activeService();
// debugger;
