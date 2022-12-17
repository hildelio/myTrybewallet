import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/header.css';
import logo from '../assets/logo.png';
import coinIcon from '../assets/coinIcon.png';
import emailIcon from '../assets/emailIcon.png';

class Header extends Component {
  render() {
    const { userEmail, expenses } = this.props;

    return (

      <header className="header-container">
        <img
          src={ logo }
          alt="logo"
          className="header-image"
        />
        <section className="header-total-container">
          <img src={ coinIcon } alt="icon" className="header-total-icon" />
          <p className="header-total-text">Total de despesas:</p>
          <p data-testid="total-field" className="header-total">
            {expenses.length !== 0 ? expenses.reduce((sum, e) => {
              const { currency } = e;
              const calcExpenses = e.value * e.exchangeRates[currency].ask;
              const result = calcExpenses + sum;
              return result;
            }, 0).toFixed(2) : (0).toFixed(2)}
          </p>
          <p data-testid="header-currency-field" className="header-total-brl">
            BRL
          </p>
        </section>
        <section className="header-email-container">
          <img src={ emailIcon } alt="email-icon" className="header-email-icon" />
          <p data-testid="email-field">{userEmail}</p>
        </section>
      </header>
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
