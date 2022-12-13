import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
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
            expenses.map((e) => (
              <tr key={ e.id }>
                <td>{e.description}</td>
                <td>{e.tag}</td>
                <td>{e.method}</td>
                <td>{Number(e.value).toFixed(2)}</td>
                <td>{e.currency}</td>
                {
                  Object.values(e.exchangeRates)
                    .filter((element) => element.codein === 'BRL'
                && element.code === e.currency)
                    .map((el) => (
                      <>
                        <td>{Number(el.ask).toFixed(2)}</td>
                        <td>{(e.value * el.ask).toFixed(2)}</td>
                        <td>{el.name}</td>
                        <td>
                          <button type="button">Editar</button>
                        </td>
                        <td>
                          <button type="button">Excluir</button>
                        </td>
                      </>
                    ))
                }

              </tr>
            ))
          }

        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
