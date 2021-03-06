import Gdpr from '../src/services/Gdpr';

describe('Test get global Gdpr method', () => {
  test('recup global rgpd', () => {
    window._gdpr = [[{type: 'foo', name: 'bar'}, [() => {}]]]; // eslint-disable-line
    const gdpr = new Gdpr({types: ['ads', 'stats']});
    expect(gdpr.getGlobalGdpr()).toMatchSnapshot();
  });

  test('global gdpr', () => {
    const arr = [
      [{type: 'other', name: 'service map'}, [() => {}]],
      [{type: 'ads', name: 'service ads'}, [() => {}]],
    ];
    window._gdpr = arr;
    const gdpr = new Gdpr();
    const t = gdpr.getGlobalGdpr();
    expect(t).toMatchSnapshot();
  });

  test('global gdpr with object', () => {
    const arr = {};
    window._gdpr = arr;
    const gdpr = new Gdpr();
    const t = gdpr.getGlobalGdpr();
    expect(t).toMatchSnapshot();
  });

  test('global gdpr not exist', () => {
    const gdpr = new Gdpr();
    const t = gdpr.getGlobalGdpr();
    expect(t).toMatchSnapshot();
  });

  test('valid global gdpr method', () => {
    const _gdpr = [
      [{type: 'others'}, () => {}],
      [{type: 'others', name: 'service tags'}, [() => {}]],
      [{type: 'ads', name: 'service ads'}],
      [{type: 'stats', name: 'service map'}, [() => {}]],
    ];
    const gdpr = new Gdpr();
    const globalGdpr = gdpr.validGlobalGdpr(_gdpr);
    expect(globalGdpr).toMatchSnapshot();
  });
});

describe('Test option pass to Gdpr class', () => {
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
});

describe('test update service state with cookie value', () => {
  test('verify update value with old setting gdpr cookie', () => {
    window._gdpr = [
      [{type: 'other', name: 'service map'}, [() => {}]],
      [{type: 'ads', name: 'service ads'}, [() => {}]],
    ];
    const gdpr = new Gdpr({type: ['ads', 'other']});
    const activated = gdpr.createActivatedObject(
      new Map([['service map', false], ['service ads', true]]),
    );
    expect(activated.get('service map')).toBeFalsy();
    expect(activated.get('service ads')).toBeTruthy();
  });
});

describe('test get List for display', () => {
  test('get list for display', () => {
    window._gdpr = [
      [
        {
          type: 'others',
          description: 'my nice description',
          name: 'service map',
        },
        [() => {}],
      ],
      [{type: 'others', name: 'service tags'}, [() => {}]],
      [{type: 'ads', name: 'service ads'}, [() => {}]],
      [{type: 'fake', name: 'service fake'}, [() => {}]],
    ];
    const gdpr = new Gdpr({types: ['ads', 'other']});
    const list = gdpr.getListServices();
    expect(list).toMatchSnapshot();
  });
});

describe('test updating service', () => {
  test('update service by name', () => {
    window._gdpr = [
      [{type: 'other', name: 'service map'}, [() => {}]],
      [{type: 'ads', name: 'service ads'}, [() => {}]],
    ];
    const gdpr = new Gdpr({types: ['ads', 'other']});
    gdpr.updateServiceByName('service map', false);
    expect(gdpr.activated.get('service map')).toBeFalsy();
    expect(gdpr.activated.get('service ads')).toBeTruthy();
  });

  test('update service by fake name', () => {
    window._gdpr = [
      [{type: 'other', name: 'service map'}, [() => {}]],
      [{type: 'ads', name: 'service ads'}, [() => {}]],
    ];
    const gdpr = new Gdpr({types: ['ads', 'other']});
    gdpr.updateServiceByName('service fake', false);
    expect(gdpr.activated.get('service map')).toBeTruthy();
    expect(gdpr.activated.get('service ads')).toBeTruthy();
  });

  test('update service by type', () => {
    window._gdpr = [
      [{type: 'other', name: 'service map'}, [() => {}]],
      [{type: 'other', name: 'service tag'}, [() => {}]],
      [{type: 'ads', name: 'service ads'}, [() => {}]],
    ];
    const gdpr = new Gdpr({types: ['ads', 'other']});
    gdpr.updateServiceByType('other', false);
    expect(gdpr.activated.get('service map')).toBeFalsy();
    expect(gdpr.activated.get('service tag')).toBeFalsy();
    expect(gdpr.activated.get('service ads')).toBeTruthy();
  });

  test('update service by fake type', () => {
    window._gdpr = [
      [{type: 'other', name: 'service map'}, [() => {}]],
      [{type: 'other', name: 'service tag'}, [() => {}]],
      [{type: 'ads', name: 'service ads'}, [() => {}]],
    ];
    const gdpr = new Gdpr({types: ['ads', 'other']});
    gdpr.updateServiceByType('fake', false);
    expect(gdpr.activated.get('service map')).toBeTruthy();
    expect(gdpr.activated.get('service tag')).toBeTruthy();
    expect(gdpr.activated.get('service ads')).toBeTruthy();
  });
});
