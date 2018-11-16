import CookieWrapper from '../src/services/CookieWrapper';
import GrpdCookie from '../src/services/GrpdCookie';

test('get exist value cookie', () => {
  const grpdCookie = new GrpdCookie();
  const cookieWrapper = new CookieWrapper();
  cookieWrapper.set(grpdCookie.name, {foo: 'bar'});
  expect(grpdCookie.getCookie()).toMatchSnapshot();
});

test('update value cookie', () => {
  const grpdCookie = new GrpdCookie();
  const cookieWrapper = new CookieWrapper();
  grpdCookie.updateCookie({lol: true, plop: false});
  expect(cookieWrapper.get(grpdCookie.name)).toMatchSnapshot();
});

test('get not exist value', () => {
  const grpdCookie = new GrpdCookie();
  const cookieWrapper = new CookieWrapper();

  const optionName = grpdCookie.name;
  cookieWrapper.remove(optionName);
  expect(grpdCookie.getCookie()).toBeUndefined();
});
