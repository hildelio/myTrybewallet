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

export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  payload: id,
});

export const SAVE_EDITION = 'SAVE_EDITION';

export const saveEditedExpense = (arr) => ({
  type: SAVE_EDITION,
  payload: arr,
});
