import Cookie from '../src/utils/Cookie.js';
import Grpd from '../src/Grpd.js';

test('test get option value', () => {
  const grpd = new Grpd({name: 'lol'});
  const optionName = grpd.getOption('name');
  expect(optionName).toBe('lol');
});

test('test cookie rgpd exist', () => {
  const grpd = new Grpd();
  const optionName = grpd.getOption('name');
  const _cookie = new Cookie();
  _cookie.remove(optionName);
  expect(grpd.getCookie()).toBeUndefined();
});

test('verify value default grpd cookie', () => {
  const grpd = new Grpd();
  expect(grpd.createActivatedObject()).toMatchSnapshot();
});

test('verify update value with old setting grpd cookie', () => {
  const grpd = new Grpd({type: ['ads', 'stats']});
  const activated = grpd.createActivatedObject({ads: false, foo: 'lol'});
  expect(activated.ads).toBeFalsy();
});

test('update value default grpd cookie', () => {
  const grpd = new Grpd();
  const t = grpd.updateCookie({lol: true, plop: false});
  expect(grpd.getCookie()).toMatchSnapshot();
});

test('get value return undefined', () => {
  const grpd = new Grpd();
  const optionName = grpd.getOption('name');
  const _cookie = new Cookie();
  _cookie.remove(optionName);
  expect(grpd.getCookie()).toBeUndefined();
});
