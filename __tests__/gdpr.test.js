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
  window._gdpr = [
    [{type: 'other', name: 'service map'}, () => {}],
    [{type: 'ads', name: 'service ads'}, () => {}],
  ];
  const gdpr = new Gdpr({type: ['ads', 'other']});
  const activated = gdpr.createActivatedObject(
    new Map([['service map', false], ['service ads', true]]),
  );
  expect(activated.get('service map')).toBeFalsy();
  expect(activated.get('service ads')).toBeTruthy();
});

test('recup global rgpd', () => {
  window._gdpr = [[{type: 'foo', name: 'bar'}, () => {}]]; // eslint-disable-line
  const gdpr = new Gdpr({type: ['ads', 'stats']});
  expect(gdpr.getGlobalGdpr()).toMatchSnapshot();
});
