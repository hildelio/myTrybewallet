import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Verificar se na página login...', () => {
  test('Tem um input de email com data testid = email-input', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmailEl = screen.getByTestId('email-input');
    expect(inputEmailEl).toBeInTheDocument();
  });
  test('Tem um input de password com data testid = password-input', () => {
    renderWithRouterAndRedux(<App />);
    const inputPasswordEl = screen.getByTestId('password-input');
    expect(inputPasswordEl).toBeInTheDocument();
  });
  test('Tem um botão para entrar na aplicação', () => {
    renderWithRouterAndRedux(<App />);
    const inputButtonEl = screen.getByRole('button', { name: /entrar/i });
    expect(inputButtonEl).toBeInTheDocument();
  });
  test('Ao clicar no botão é direcionado para a aplicação', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmailEl = screen.getByTestId('email-input');
    const inputPasswordEl = screen.getByTestId('password-input');
    const inputButtonEl = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(inputEmailEl, 'alguem@mail.com');
    userEvent.type(inputPasswordEl, '123456');
    expect(inputButtonEl).toBeEnabled();
    userEvent.click(inputButtonEl);
    expect(history.location.pathname).toBe('/carteira');
  });
});
