import {reloadIsNeeded} from '../Actions';

test('service has change to false', () => {
  const services = [
    {
      name: '1',
      type: 'fake',
      state: true,
    },
    {
      name: '2',
      type: 'fake',
      state: true,
    },
  ];
  const servicesChanged = [
    {
      name: '1',
      type: 'fake',
      state: false,
    },
    {
      name: '2',
      type: 'fake',
      state: true,
    },
  ];

  expect(reloadIsNeeded(services, servicesChanged)).toBeTruthy();
});

test('service has no change to false', () => {
  const services = [
    {
      name: '1',
      type: 'fake',
      state: false,
    },
    {
      name: '2',
      type: 'fake',
      state: true,
    },
  ];
  const servicesChanged = [
    {
      name: '1',
      type: 'fake',
      state: true,
    },
    {
      name: '2',
      type: 'fake',
      state: true,
    },
  ];

  expect(reloadIsNeeded(services, servicesChanged)).toBeFalsy();
});
