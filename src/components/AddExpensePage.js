import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {       // also export this un-connect()ed version so we can test it
  onSubmit = (expense) => {
    // props.dispatch(addExpense(expense));     // replaced by the line below: props.onSubmit(expense)
    this.props.addExpense(expense);             // this is easier to test than the line above
    this.props.history.push('/');               // 'history' is from React Router - check the docs (no page refresh, use browser routing)
  };

  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({                 // 2nd parameter passed to connect(), after mapStateToProps
  addExpense: (expense) => dispatch(addExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);       // connect the component to the redux store so it can 'dispatch'

// Read the docs:   https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options