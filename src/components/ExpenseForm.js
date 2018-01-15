import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

const now = moment();
// console.log(now.format('MMM Do, YYYY'));

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),        // if props.expense, then pass existing timestamp to moment(), else get new moment()
      calendarFocused: false,
      error: ''
    };
  }

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description: description }));
  };

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));     // shorthand method of passing object value
  };

  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {      // regex to check for ddddd.dd  (numbers with digit and max 2 numbers following)
      this.setState(() => ({ amount }));
    }
  };

  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onSubmit = (e) => {
    e.preventDefault();         // block the full page refresh that happens with form submissions

    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({ error: 'Please provide description and amount.' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),          // check momentjs docs for valueOf method
        note: this.state.note
      });
    }
  };

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          type="text"
          placeholder="Description"
          autoFocus
          className="text-input"
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <input
          type="text"
          placeholder="Amount"
          className="text-input"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}        // check the docs for this one
        />
        <textarea
          placeholder="Add a note for your expense (optional)"
          className="textarea"
          value={this.state.note}
          onChange={this.onNoteChange}
        >
        </textarea>
        <div>
          <button className="button">Save Expense</button>
        </div>
      </form>
    )
  }
}