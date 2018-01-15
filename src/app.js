import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';                  // Redux store
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
// import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';     // CSS browser reset
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
// import './playground/promises';

const store = configureStore();

// store.dispatch(addExpense({ description: 'Water bill', amount: 4500 }));
// store.dispatch(addExpense({ description: 'Gas bill', createdAt: 1000 }));
// store.dispatch(addExpense({ description: 'Rent', amount: 109500 }));

// store.dispatch(setTextFilter('water'));

// setTimeout(() => {
//   store.dispatch(setTextFilter('bill'));
// }, 3000);

// const state = store.getState();       // have to get state from the store first
// const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
// console.log(visibleExpenses);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // console.log('uid', user.uid);
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {            // check if on login page, and only redirect from / (not from anywhere else)
        history.push('/dashboard');
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});