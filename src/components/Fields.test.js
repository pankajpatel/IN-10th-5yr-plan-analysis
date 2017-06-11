import React from 'react';
import ReactDOM from 'react-dom';
import Fields from './Fields';
const data = [
  {label: "Field 1"},
  {label: "Field 2"}
]
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Fields fields={data}/>, div);
});

it('renders inputs', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Fields fields={data}/>, div);
  expect(div.querySelectorAll('input').length).toEqual(data.length + 1);
});
