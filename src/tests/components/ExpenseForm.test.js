import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm correctly with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);       // ExpenseForm expects a prop with the name expense'
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {         // test submit form with no data
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();              // to make sure no error shows up  (1st snapshot)
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }                     // give a fake 'preventDefault' function to avoid an error because we're not passing 'e.preventDefault' to the Form we're testing (try without this to see the error)
  });
  expect(wrapper.state('error').length).toBeGreaterThan(1);         // test if there is a text value in the 'error' property
  expect(wrapper).toMatchSnapshot();              // make sure the error always renders correctly (2nd snapshot). See the snapshot file for what I mean.
});

test('should set description on input change', () => {      // testing change event for onDescriptionChange()
  const value = 'New description';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(0).simulate('change', {          // simulate 'change' event on 1st input field (description)
    target: { value }                                       // rather than using '.at', a better (more specific) way could be to use a div id of the input field - see http://airbnb.io/enzyme/docs/api/ShallowWrapper/find.html
  });
  expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () => {          // testing change event for onNoteChange()
  const value = 'This is a test note';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('textarea').simulate('change', {             // no '.at' like above because there is only one textarea
    target: { value }                                       // set 'e.target.value' because onNoteChange() expects it
  });
  expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input', () => {            // testing onAmountChange()
  const value = '23.50';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {          // '.at(1) for 2nd input field which is the amount field
    target: { value }
  });
  expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => {      // testing onAmountChange()
  const value = '12.122';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {          // '.at(1) for 2nd input field which is the amount field
    target: { value }
  });
  expect(wrapper.state('amount')).toHaveLength(0);          // could also have used .toBe('')  - I used this one for fun.
});

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();                            // create a test spy (mock function)
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);        // use expenses[0] to test with
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
  });
});

test('should set new date on date change', () => {        // see onDateChange prop of SingleDatePicker
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onDateChange')(now);            // can also find by Component name
  expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change', () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });        // shorthand.  Can also be { focused:focused }
  expect(wrapper.state('calendarFocused')).toBe(focused);
});