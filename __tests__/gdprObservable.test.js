import GdprObservable from '../src/services/GdprObservable';

test('set observer', () => {
  const _gdpr = [[{type: 'ads', name: 'Mon super service'}, () => 'hello']];
  const g = new GdprObservable(_gdpr, ['ads']);
  expect(g.observers['ads']).toBeDefined();
  expect(g.observers['ads']).toHaveLength(1);
});

test('set observer with type not allowed', () => {
  const _gdpr = [[{type: 'no type', name: 'Mon super service'}, () => 'hello']];
  const g = new GdprObservable(_gdpr, ['ads']);
  expect(g.observers['no type']).toBeUndefined();
});

test('set observer with only one element', () => {
  const _gdpr = [[{type: 'wtf'}, () => 'hello']];
  const g = new GdprObservable(_gdpr, ['ads']);
  expect(g.observers['wtf']).toBeUndefined();
});

test('set observer with only two elements', () => {
  const _gdpr = [[{type: 'wtf'}]];
  const g = new GdprObservable(_gdpr, ['ads']);
  expect(g.observers['wtf']).toBeUndefined();
});

test('set observer with 3 elements but element 3 is string', () => {
  const _gdpr = [[{type: 'wtf', name: 'wtf'}, 'wtf']];
  const g = new GdprObservable(_gdpr, ['ads']);
  expect(g.observers['wtf']).toBeUndefined();
});

test('test call callback', () => {
  const call = jest.fn();
  const nocall = jest.fn();
  const _gdpr = [
    [{type: 'ads', name: 'wtf'}, call],
    [{type: 'ads', name: 'hello'}, call],
    [{type: 'stats', name: 'bar'}, nocall],
  ];
  const g = new GdprObservable(_gdpr, ['ads', 'stats']);
  g.active('ads');
  expect(call).toHaveBeenCalledTimes(2);
  expect(nocall).toHaveBeenCalledTimes(0);
});
