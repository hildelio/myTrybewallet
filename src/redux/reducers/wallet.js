import { CURRENCIES } from '../actions';

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
  default: return state;
  }
};

export default walletReducer;
