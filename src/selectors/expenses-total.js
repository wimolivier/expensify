export default (expenses) => {
  // tests will still pass without explicit '0' test, because the return value will still be 0 if the expenses array is empty
  // if (expenses.length === 0) {
  //   return 0;
  // } else {
  return expenses
    .map((expense) => expense.amount)
    .reduce((sum, value) => sum + value, 0);
  // }
};