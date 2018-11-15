import Cookie from '../src/utils/Cookie';

test('cookie get all value', () => {
  const _cookie = new Cookie();
  _cookie.set('plop', 'ok');
  const all = _cookie.getAll();
  expect(all).toMatchSnapshot();
});

test('cookie set value', () => {
  const _cookie = new Cookie();
  _cookie.set('plop', 'ok');
  const all = _cookie.getAll();
  expect(all).toMatchSnapshot();
});

test('cookie set value not valid', () => {
  const _cookie = new Cookie();
  _cookie.set('plop', []);
  const all = _cookie.get('plop');
  expect(all).toBe('[]');
});

test('cookie get single value', () => {
  const _cookie = new Cookie();
  _cookie.set('lol', 'ok');
  const all = _cookie.get('lol');
  expect(all).toBe('ok');
});

test('cookie get single value not exist', () => {
  const _cookie = new Cookie();
  const all = _cookie.get('foo');
  expect(all).toBeUndefined();
});

test('cookie remove single value', () => {
  const _cookie = new Cookie();
  _cookie.set('lol', 'ok');
  const all = _cookie.remove('lol');
  expect(all).toBeUndefined();
});
