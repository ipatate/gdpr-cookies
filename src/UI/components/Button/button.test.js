import {h} from 'preact';
import {render, fireEvent} from '@testing-library/preact';
import Button from './Button';

test('test button with click and class name', () => {
  const onClick = jest.fn();
  const tree = render(
    <Button onClick={onClick} className="test">
      My Button
    </Button>,
  );
  fireEvent(tree.getByText('My Button'), new Event('click'));
  expect(tree.getByText('My Button')).toMatchSnapshot();
  expect(onClick).toHaveBeenCalledTimes(1);
});
