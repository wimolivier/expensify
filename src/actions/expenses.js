import uuid from 'uuid';

// ADD_EXPENSE
export const addExpense = (
  {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description: description,
    note,                       // can also use shorthand method because key/value names are the same
    amount: amount,
    createdAt: createdAt
  }
});

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({           // destructure 'id' off the object passed in (or set to empty object if nothing passed in)
  type: 'REMOVE_EXPENSE',
  id: id                                            // also pass in the 'id' to remove from the array
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});