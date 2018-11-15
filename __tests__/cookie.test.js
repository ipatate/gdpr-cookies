import cookie from '../src/utils/Cookie';

test('cookie get all value', () => {
  const _cookie = cookie();
  _cookie.set('plop', 'ok');
  const all = _cookie.getAll();
  expect(all).toMatchSnapshot();
});

test('cookie set value', () => {
  const _cookie = cookie();
  _cookie.set('plop', 'ok');
  const all = _cookie.getAll();
  expect(all).toMatchSnapshot();
});

test('cookie get single value', () => {
  const _cookie = cookie();
  _cookie.set('lol', 'ok');
  const all = _cookie.get('lol');
  expect(all).toBe('ok');
});

test('cookie remove single value', () => {
  const _cookie = cookie();
  _cookie.set('lol', 'ok');
  const all = _cookie.remove('lol');
  expect(all).toBeUndefined();
});
