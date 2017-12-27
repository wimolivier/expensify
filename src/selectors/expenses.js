import moment from 'moment';

// Get visible expenses

// const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {      // destructure items off 'filters'
export default (expenses, { text, sortBy, startDate, endDate }) => {      // destructure items off 'filters'.  Alternate default export syntax!
  return expenses.filter((expense) => {
    const createdAtMoment = moment(expense.createdAt);
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;     // check momentjs docs
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1;        // check the JS docs for 'sort' to see the meaning of the return values
    }
  });
};

// export default getVisibleExpenses;      // see alternate export default syntax above