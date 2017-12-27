// Expenses reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {    // works only on the 'expenses' part of the state object
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];          // spread operator. returns a new array with 'expense' added to the end.
    //return state.concat(action.expense);        // will return a new array. do not use '.push' because it modifies the existing array
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);      // destructure 'id' from object and then determine what to do based on if the match is true/false (read up on 'filter' return values)
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,             // grab existing properties     (object spread operator)
            ...action.updates       // override with properties passed down and return a new object (never change the original object here)
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

export default expensesReducer;