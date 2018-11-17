import CookieWrapper from '../src/services/CookieWrapper';
import GdprCookie from '../src/services/GdprCookie';

test('get exist value cookie', () => {
  const gdprCookie = new GdprCookie();
  const cookieWrapper = new CookieWrapper();
  cookieWrapper.set(gdprCookie.name, {foo: 'bar'});
  expect(gdprCookie.getCookie()).toMatchSnapshot();
});

test('update value cookie', () => {
  const gdprCookie = new GdprCookie();
  const cookieWrapper = new CookieWrapper();
  gdprCookie.updateCookie({lol: true, plop: false});
  expect(cookieWrapper.get(gdprCookie.name)).toMatchSnapshot();
});

test('get not exist value', () => {
  const gdprCookie = new GdprCookie();
  const cookieWrapper = new CookieWrapper();

  const optionName = gdprCookie.name;
  cookieWrapper.remove(optionName);
  expect(gdprCookie.getCookie()).toBeUndefined();
});
