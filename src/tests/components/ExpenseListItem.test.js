import React from 'react';
import { shallow } from 'enzyme';
import ExpenseListItem from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';

test('should render an ExpenseListItem correctly with sample data', () => {
  const expense = expenses[1];
  const wrapper = shallow(<ExpenseListItem {...expenses[1]} />);        // or could have passed each prop in on it's own
  expect(wrapper).toMatchSnapshot();
});