import GrpdObservable from '../src/services/GrpdObservable';

test('set observer', () => {
  const _grpd = [['ads', 'Mon super service', () => 'hello']];
  const g = new GrpdObservable(_grpd, ['ads']);
  expect(g.observers['ads']).toBeDefined();
  expect(g.observers['ads']).toHaveLength(1);
});

test('set observer with type not allowed', () => {
  const _grpd = [['no type', 'Mon super service', () => 'hello']];
  const g = new GrpdObservable(_grpd, ['ads']);
  expect(g.observers['no type']).toBeUndefined();
});

test('set observer with only one element', () => {
  const _grpd = [['wtf', () => 'hello']];
  const g = new GrpdObservable(_grpd, ['ads']);
  expect(g.observers['wtf']).toBeUndefined();
});

test('set observer with only two elements', () => {
  const _grpd = [['wtf']];
  const g = new GrpdObservable(_grpd, ['ads']);
  expect(g.observers['wtf']).toBeUndefined();
});

test('set observer with 3 elements but element 3 is string', () => {
  const _grpd = [['wtf', 'wtf', 'wtf']];
  const g = new GrpdObservable(_grpd, ['ads']);
  expect(g.observers['wtf']).toBeUndefined();
});

test('test call callback', () => {
  const call = jest.fn();
  const nocall = jest.fn();
  const _grpd = [
    ['ads', 'wtf', call],
    ['ads', 'hello', call],
    ['stats', 'bar', nocall],
  ];
  const g = new GrpdObservable(_grpd, ['ads', 'stats']);
  g.active('ads');
  expect(call).toHaveBeenCalledTimes(2);
  expect(nocall).toHaveBeenCalledTimes(0);
});
