import uuid from 'uuid';
import database from '../firebase/firebase';

/*
  Current
  1. Component calls an action generator
  2. Action generator returns an object
  3. Component dispatches object
  4. Redux store changes

  Async Redux Actions
  1. Component calls an action generator
  2. Action generator returns a function
  3. Component dispatches function
  4. The function runs (has the ability to dispatch other actions and do whatever it wants)
*/


// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expensedata = {}) => {
  return (dispatch, getState) => {                                      // can also get 'getState' from redux-thunk (check the docs)
    const uid = getState().auth.uid;
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expensedata;
    const expense = { description, note, amount, createdAt };

    return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {       // return'ing so we can chain promises in the test file
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    });
  };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({           // destructure 'id' off the object passed in (or set to empty object if nothing passed in)
  type: 'REMOVE_EXPENSE',
  id: id                                            // also pass in the 'id' to remove from the array
});

export const startRemoveExpense = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {                 // return the Promise so we can use it in the test case
      dispatch(removeExpense({ id }));
    });
  };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {          // return the Promise so we can use it in the test case
      dispatch(editExpense(id, updates));
    });
  };
};

// SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

export const startSetExpenses = () => {
  return (dispatch, getState) => {                                              // also gets 'getState' from redux-thunk (check docs)
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
      const expenses = [];

      snapshot.forEach((childSnapshot) => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      dispatch(setExpenses(expenses));
    });
  };
};