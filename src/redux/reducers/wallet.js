import { ADD_EXPENSES, CURRENCIES, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  totalExpenses: 0,
  currency: '',
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES: {
    return {
      ...state,
      currencies: action.payload,
    };
  }
  case ADD_EXPENSES: {
    const exchangeRatesValues = Object.values(action.payload[0].exchangeRates);
    const exchangeFiltered = exchangeRatesValues
      .filter((e) => e.codein === 'BRL' && e.code === action.payload[0].currency);
    const { ask } = exchangeFiltered[0];
    const calcTotalExpenses = +(state.totalExpenses)
    + (+(action.payload[0].value) * (ask));
    return {
      ...state,
      expenses: state.expenses.concat(action.payload),
      totalExpenses: calcTotalExpenses.toFixed(2),
    };
  }
  case DELETE_EXPENSE: {
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  }
  default: return state;
  }
};

export default walletReducer;
