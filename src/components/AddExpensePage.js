import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {       // also export this un-connect()ed version so we can test it
  onSubmit = (expense) => {
    // props.dispatch(addExpense(expense));     // replaced by the line below: props.onSubmit(expense)
    this.props.startAddExpense(expense);             // this is easier to test than the line above
    this.props.history.push('/');               // 'history' is from React Router - check the docs (no page refresh, use browser routing)
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({                 // 2nd parameter passed to connect(), after mapStateToProps
  startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);       // connect the component to the redux store so it can 'dispatch'

// Read the docs:   https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options