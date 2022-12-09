import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { email, password } = this.state;
      const re = /\S+@\S+\.\S+/;
      const result = re.test(email);
      const MIN_LENGTH_PASSWORD = 6;

      if (email.length > 0 && result === true && password.length >= MIN_LENGTH_PASSWORD) {
        this.setState({
          isDisabled: false,
        });
      } else {
        this.setState({
          isDisabled: true,
        });
      }
    });
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(userEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div>
        <input
          type="email"
          data-testid="email-input"
          onChange={ this.handleChange }
          value={ email }
          name="email"
        />

        <input
          type="password"
          data-testid="password-input"
          onChange={ this.handleChange }
          value={ password }
          name="password"
        />

        <button
          type="button"
          disabled={ isDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
