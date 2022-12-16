import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpense } from '../redux/actions';

class Table extends Component {
  handleDeleteClick = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(id));
  };

  handleEdit = ({ target }) => {
    const { dispatch } = this.props;
    dispatch(editExpense(target.id));
  };

  render() {
    const { expenses } = this.props;
    // const { id, value, description, currency, method, tag, exchangeRates } = expenses;
    return (
      <table>
        <thead>
          <tr>
            <th>
              Descrição
            </th>
            <th>
              Tag
            </th>
            <th>
              Método de pagamento
            </th>
            <th>
              Valor
            </th>
            <th>
              Moeda
            </th>
            <th>
              Câmbio utilizado
            </th>
            <th>
              Valor convertido
            </th>
            <th>
              Moeda de conversão
            </th>
            <th>
              Editar/Excluir
            </th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.length > 0 && (
              expenses.map(({
                id, description, tag, method, value, currency, exchangeRates,
              }) => (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{currency}</td>

                  <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>{(value * exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>{exchangeRates[currency].name}</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      className="edit"
                      id={ id }
                      onClick={ (event) => this.handleEdit(event) }
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.handleDeleteClick(id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              )))
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.array,
  currencies: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(Table);
