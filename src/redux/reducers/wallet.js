import { ADD_EXPENSES, CURRENCIES, DELETE_EXPENSE,
  EDIT_EXPENSE, SAVE_EDITION } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  idScore: -1,
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
    console.log(state.expenses, action.payload);
    // const concatExpenses = state.expenses.concat(action.payload);
    return {
      ...state,
      expenses: [...state.expenses,
        {
          id: state.idScore + 1,
          ...action.payload[0],
        }],
      idScore: state.idScore + 1,
    };
  }
  case DELETE_EXPENSE: {
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  }
  case EDIT_EXPENSE: {
    return {
      ...state,
      idToEdit: action.payload,
      editor: true,
    };
  }
  case SAVE_EDITION:
    state.expenses.map((e) => console.log(e.id, e.exchangeRates));
    return {
      ...state,
      expenses: state.expenses
        .map((expense) => (expense.id === Number(state.idToEdit) ? ({
          id: expense.id,
          ...action.payload[0],
          exchangeRates: expense.exchangeRates,
        }) : expense)),
      editor: false,
    };
  default: return state;
  }
};

export default walletReducer;
