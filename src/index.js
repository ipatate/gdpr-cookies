import Observable from './services/Observable';
// import Grpd from './services/Grpd';
var _grpd = _grpd || [];

var t = function() {
  console.log('hello'); // eslint-disable-line
};

_grpd.push(['ads', 'Google Map', t]);

const o = new Observable(_grpd);
o.active('ads');
debugger;
// const options = {
//   keepCookies: ['tarteaucitron', 'test'],
// };

// const gdpr = new Grpd(options); // eslint-disable-line
