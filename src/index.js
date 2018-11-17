import Gdpr from './services/Gdpr';

// debugger;
const options = {
  keepCookies: ['tarteaucitron', 'test'],
};

const gdpr = new Gdpr(options); // eslint-disable-line

// active service allowed
gdpr.activeService();
// debugger;
