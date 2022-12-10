export const USER_EMAIL = 'USER_EMAIL';

export const userEmail = (email) => ({
  type: USER_EMAIL,
  payload: email,
});

export const CURRENCIES = 'CURRENCIES';

export const currenciesAction = (curr) => {
  console.log('curr', curr);
  return {

    type: CURRENCIES,
    payload: curr,
  };
};
