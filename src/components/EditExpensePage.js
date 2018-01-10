import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push('/');        // React Router 'push' (browser redirect)
    // console.log('updated', expense);
  };

  onRemove = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <ExpenseForm
          expense={this.props.expense}           // pass expense into ExpenseForm as a prop
          onSubmit={this.onSubmit}
        />
        <button
          onClick={this.onRemove}
        >Remove</button>
      </div>
    );
  };
};

const mapStateToProps = (state, props) => ({        // implicitly return an object
  expense: state.expenses.find((expense) => expense.id === props.match.params.id)         // using the Array:find method - read the docs
});


const mapDispatchToProps = (dispatch, props) => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);