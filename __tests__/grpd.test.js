import Cookie from '../src/utils/Cookie';
import Grpd from '../src/Grpd';

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
  expect(grpd.createValueCookie()).toMatchSnapshot();
});

test('update value default grpd cookie', () => {
  const grpd = new Grpd();
  const t = grpd.updateCookie({lol: true, plop: false});
  expect(grpd.getCookie()).toMatchSnapshot();
});
