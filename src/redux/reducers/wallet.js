import { ADD_EXPENSES, CURRENCIES, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
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
    return {
      ...state,
      expenses: state.expenses.concat(action.payload),
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
