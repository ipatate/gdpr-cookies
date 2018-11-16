import Grpd from '../src/services/Grpd';

test('test get option value', () => {
  const grpd = new Grpd({name: 'lol'});
  const optionName = grpd.getOption('name');
  expect(optionName).toBe('lol');
});

test('verify value default grpd cookie', () => {
  const grpd = new Grpd();
  expect(grpd.createActivatedObject()).toMatchSnapshot();
});

test('verify update value with old setting grpd cookie', () => {
  const grpd = new Grpd({type: ['ads', 'stats']});
  const activated = grpd.createActivatedObject({ads: true, foo: 'lol'});
  expect(activated.ads).toBeTruthy();
  expect(activated.stats).toBeFalsy();
});
