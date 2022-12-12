import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getCurrencies from '../services/api';
import { addExpenses, currenciesAction } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

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

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const result = await getCurrencies();
    this.setState({ exchangeRates: result }, () => {
      const { id, value, description, currency, method, tag, exchangeRates } = this.state;
      const { dispatch } = this.props;
      this.setState({ id: id + 1 });

      dispatch(addExpenses([{
        id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      }]));
      this.setState({
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      });
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          {' '}
          <input
            type="number"
            data-testid="value-input"
            id="value-input"
            value={ value }
            name="value"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          {' '}
          <input
            type="text"
            data-testid="description-input"
            id="description-input"
            value={ description }
            name="description"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          {' '}
          <select
            data-testid="currency-input"
            id="currency-input"
            value={ currency }
            name="currency"
            onChange={ this.handleChange }
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
            value={ method }
            name="method"
            onChange={ this.handleChange }
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
            value={ tag }
            name="tag"
            onChange={ this.handleChange }
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
          onClick={ this.handleClick }
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
