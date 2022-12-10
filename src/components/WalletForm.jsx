import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getCurrencies from '../services/api';
import { currenciesAction } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    this.currenciesAPI();
  }

  currenciesAPI = async () => {
    const { dispatch } = this.props;
    const result = await getCurrencies();
    const resultKeys = Object.keys(result);
    const resultKeysFinal = resultKeys.filter((e) => e !== 'USDT');
    dispatch(currenciesAction(resultKeysFinal));
  };

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          {' '}
          <input
            type="text"
            data-testid="value-input"
            id="value-input"
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          {' '}
          <input
            type="text"
            data-testid="description-input"
            id="description-input"
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          {' '}
          <select
            data-testid="currency-input"
            id="currency-input"
          >
            {
              currencies.map((coin) => (
                <option key={ coin }>{coin}</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="method-input">
          Método de Pagamento:
          {' '}
          <select
            data-testid="method-input"
            id="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria:
          {' '}
          <select
            data-testid="tag-input"
            id="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          type="button"
        >
          Adicionar despesa
        </button>

      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
