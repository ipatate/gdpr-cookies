import {createScript, createStyle, createIframe} from '../CallbackBase';

test('test Script', () => {
  const script = createScript('myscript.js');
  expect(script).toMatchSnapshot();
});

test('test Style', () => {
  const style = createStyle('mystyle.css');
  expect(style).toMatchSnapshot();
});

test('test iframe', () => {
  const iframe = createIframe('id', {href: 'lol', width: '200px'});
  expect(iframe).toMatchSnapshot();
});
