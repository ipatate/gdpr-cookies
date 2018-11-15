import Grpd from './grpd';

const options = {
  keepCookies: ['tarteaucitron', 'test'],
};

const gdpr = new Grpd(options);
debugger;
// Cookie.set('tarteaucitron', 'lol');
// Cookie.set('test', 'plop');

// const allCookies = Cookie.get();

// Object.keys(allCookies).forEach(k => {
//   if (keepCookie.indexOf(k) === -1) {
//     Cookie.remove(k);
//   }
// });

// const finalCookies = Cookie.get();
