export const USER_EMAIL = 'USER_EMAIL';

export const userEmail = (email) => ({
  type: USER_EMAIL,
  payload: email,
});

export const CURRENCIES = 'CURRENCIES';

export const currenciesAction = (curr) => ({
  type: CURRENCIES,
  payload: curr,
});

export const ADD_EXPENSES = 'ADD_EXPENSES';

export const addExpenses = (arr) => ({
  type: ADD_EXPENSES,
  payload: arr,
});
