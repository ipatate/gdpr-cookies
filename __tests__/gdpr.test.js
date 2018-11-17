import Gdpr from '../src/services/Gdpr';

test('test get existing option value', () => {
  const gdpr = new Gdpr({name: 'lol'});
  const optionName = gdpr.getOption('name');
  expect(optionName).toBe('lol');
});

test('test get not existing option value', () => {
  const gdpr = new Gdpr({name: 'lol'});
  const optionName = gdpr.getOption('foo');
  expect(optionName).toBeUndefined();
});

test('verify value default gdpr cookie', () => {
  const gdpr = new Gdpr();
  expect(gdpr.createActivatedObject()).toMatchSnapshot();
});

test('verify update value with old setting gdpr cookie', () => {
  const gdpr = new Gdpr({type: ['ads', 'stats']});
  const activated = gdpr.createActivatedObject({ads: true, foo: 'lol'});
  expect(activated.ads).toBeTruthy();
  expect(activated.stats).toBeFalsy();
});

test('recup global rgpd', () => {
  window._gdpr = [['foo', 'bar', () => {}]]; // eslint-disable-line
  const gdpr = new Gdpr({type: ['ads', 'stats']});
  expect(gdpr.getGlobalGdpr()).toMatchSnapshot();
});
