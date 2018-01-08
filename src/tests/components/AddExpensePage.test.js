import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let startAddExpense, history, wrapper;

// Jest lifecycle method to help us no duplicate code
// See http://facebook.github.io/jest/docs/en/api.html#beforeeachfn-timeout
beforeEach(() => {
  startAddExpense = jest.fn();                 // test spy
  history = { push: jest.fn() };        // another test spy
  wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />);
});

test('should render AddExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);        // use a sample expense from our fixtures to test with
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
});