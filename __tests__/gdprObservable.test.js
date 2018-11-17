import GdprObservable from '../src/services/GdprObservable';

test('set observer', () => {
  const _gdpr = [['ads', 'Mon super service', () => 'hello']];
  const g = new GdprObservable(_gdpr, ['ads']);
  expect(g.observers['ads']).toBeDefined();
  expect(g.observers['ads']).toHaveLength(1);
});

test('set observer with type not allowed', () => {
  const _gdpr = [['no type', 'Mon super service', () => 'hello']];
  const g = new GdprObservable(_gdpr, ['ads']);
  expect(g.observers['no type']).toBeUndefined();
});

test('set observer with only one element', () => {
  const _gdpr = [['wtf', () => 'hello']];
  const g = new GdprObservable(_gdpr, ['ads']);
  expect(g.observers['wtf']).toBeUndefined();
});

test('set observer with only two elements', () => {
  const _gdpr = [['wtf']];
  const g = new GdprObservable(_gdpr, ['ads']);
  expect(g.observers['wtf']).toBeUndefined();
});

test('set observer with 3 elements but element 3 is string', () => {
  const _gdpr = [['wtf', 'wtf', 'wtf']];
  const g = new GdprObservable(_gdpr, ['ads']);
  expect(g.observers['wtf']).toBeUndefined();
});

test('test call callback', () => {
  const call = jest.fn();
  const nocall = jest.fn();
  const _gdpr = [
    ['ads', 'wtf', call],
    ['ads', 'hello', call],
    ['stats', 'bar', nocall],
  ];
  const g = new GdprObservable(_gdpr, ['ads', 'stats']);
  g.active('ads');
  expect(call).toHaveBeenCalledTimes(2);
  expect(nocall).toHaveBeenCalledTimes(0);
});
