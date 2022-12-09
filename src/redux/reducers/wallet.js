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
  default: return state;
  }
};

export default walletReducer;
