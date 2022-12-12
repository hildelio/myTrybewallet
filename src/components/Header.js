import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userEmail, userExpenses, currency } = this.props;
    return (
      <div>
        <p data-testid="email-field">{userEmail}</p>
        <p data-testid="total-field">
          {userExpenses}
        </p>
        <p data-testid="header-currency-field">
          {currency}
          {' '}
          BRL
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string,
  userExpenses: PropTypes.number,
  currency: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  userExpenses: state.wallet.totalExpenses,
  currency: state.wallet.currency,
});

export default connect(mapStateToProps)(Header);
