import { createStore } from 'redux';

// Action generators - function that return action objects

// const add = (data) => {
//   return data.a + data.b;
// };
// const add = ({ a, b }, c) => {     // destructure the passed object arguments into 'a' and 'b' values passed
//   return a + b + c;
// };
// console.log(add({ a: 1, b: 12 }, 100));

const incrementCount = ({ incrementBy = 1 } = {}) => ({       // if it does not exist, start it off as an empty object
  type: 'INCREMENT',
  incrementBy: incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy             // can specify singularly only if 'key' is the same as 'value', eg. decrementBy:decrementBy
});

const setCount = ({ count }) => ({
  type: 'SET',
  count
});

const resetCount = () => ({
  type: 'RESET'
});


// Reducers
// 1. Reducers are 'pure functions' - the output only depends on the input (no interacting with outside-scope variables, etc.)
// 2. Never directly change state or action (just return an object that reflects the new state)

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      };
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      }
    case 'SET':
      return {
        count: action.count
      }
    case 'RESET':
      return {
        count: 0
      }
    default:
      return state;
  }
}

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {         // return value is the unsubscribe function
  console.log(store.getState());
});

// An Action is just an object with properties/commands that's sent to the Redux store.

// I'd like to increment the count
// store.dispatch({
//   type: 'INCREMENT',
//   incrementBy: 5
// });

//unsubscribe();

store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(setCount({ count: 101 }));