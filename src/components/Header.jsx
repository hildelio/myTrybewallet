import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userEmail, expenses } = this.props;

    return (

      <div>
        <p data-testid="email-field">{userEmail}</p>
        <p data-testid="total-field">
          {expenses.length !== 0 ? expenses.reduce((sum, e) => {
            const { currency } = e;
            const calcExpenses = e.value * e.exchangeRates[currency].ask;
            const result = calcExpenses + sum;
            return result;
          }, 0).toFixed(2) : (0).toFixed(2)}
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string,
  currency: PropTypes.string,
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currency: state.wallet.currency,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
