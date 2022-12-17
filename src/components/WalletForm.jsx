import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getCurrencies from '../services/api';
import { addExpenses, currenciesAction, saveEditedExpense } from '../redux/actions';
import '../css/walletForm.css';

const ALIMENTACAO = 'Alimentação';
class WalletForm extends Component {
  state = {
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
      const { value, description, currency, method, tag, exchangeRates } = this.state;
      const { dispatch } = this.props;

      dispatch(addExpenses([{
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
        tag: ALIMENTACAO,
      });
    });
  };

  handleEdit = () => {
    const { dispatch } = this.props;
    const { value, description, currency, method, tag, exchangeRates } = this.state;
    dispatch(saveEditedExpense([{
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
      tag: ALIMENTACAO,
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;
    return (
      <form className="form-container">
        <label htmlFor="value-input">
          Valor:
          {' '}
          <input
            type="number"
            data-testid="value-input"
            className="value-input"
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
            className="description-input"
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
            className="currency-input"
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
            className="method-input"
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
            className="tag-input"
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
          onClick={ editor ? this.handleEdit : this.handleClick }
          className="button-addOrEdit"
        >
          {
            editor ? 'Editar despesa' : 'Adicionar despesa'
          }
        </button>

      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.array,
  editor: PropTypes.bool,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
});

export default connect(mapStateToProps)(WalletForm);
