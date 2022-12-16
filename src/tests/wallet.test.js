import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Verificar se na página wallet...', () => {
  const valueInput = 'value-input';
  const descriptionInput = 'description-input';
  test('Se os inputs estão na tela', () => {
    renderWithRouterAndRedux(<Wallet />, '/carteira');
    const inputValueEl = screen.getByTestId(valueInput);
    const inputDescriptionEl = screen.getByTestId(descriptionInput);
    const inputCurrencyEl = screen.getByTestId('currency-input');
    const inputMethodEl = screen.getByTestId('method-input');
    const inputTagEl = screen.getByTestId('tag-input');
    const buttonEl = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(inputValueEl).toBeInTheDocument();
    expect(inputDescriptionEl).toBeInTheDocument();
    expect(inputCurrencyEl).toBeInTheDocument();
    expect(inputMethodEl).toBeInTheDocument();
    expect(inputTagEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();
  });
  test('Se a Tabela é renderizada na tela', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    renderWithRouterAndRedux(<Wallet />, '/carteira');
    const inputValueEl = screen.getByTestId(valueInput);
    const inputDescriptionEl = screen.getByTestId(descriptionInput);
    const inputCurrencyEl = screen.getByTestId('currency-input');
    const inputMethodEl = screen.getByTestId('method-input');
    const inputTagEl = screen.getByTestId('tag-input');
    const buttonEl = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(inputValueEl, '1000');
    userEvent.type(inputDescriptionEl, 'one thousand dollars');
    userEvent.type(inputCurrencyEl, 'USD');
    userEvent.type(inputMethodEl, 'Dinheiro');
    userEvent.type(inputTagEl, 'Lazer');
    userEvent.click(buttonEl);
    const descriptionEl = await screen.findByText(/one thousand/i);
    const tagEl = await screen.findByText(/lazer/i);
    // const methodEl = await screen.findByText(/dinheiro/i);
    // const valueEl = await screen.findByText(/100.00/i);
    // const currencyEl = await screen.findByText(/usd/i);
    // const convertedValueEl = await screen.findByText(/527.97/i);
    const conversionCurrencyEl = await screen.findByText(/Real Brasileiro/i);
    const editButtonEl = await screen.findByRole('button', { name: /editar/i });
    const deleteButtonEl = await screen.findByRole('button', { name: /excluir/i });

    expect(descriptionEl).toBeInTheDocument();
    expect(tagEl).toBeInTheDocument();
    // expect(methodEl).toBeInTheDocument();
    // expect(valueEl).toBeInTheDocument();
    // expect(currencyEl).toBeInTheDocument();
    // expect(convertedValueEl).toBeInTheDocument();
    expect(conversionCurrencyEl).toBeInTheDocument();
    expect(editButtonEl).toBeInTheDocument();
    expect(deleteButtonEl).toBeInTheDocument();
  });
  test('Se após renderizar tabela o botão deleta a linha inclusive o próprio botão de deletar', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    renderWithRouterAndRedux(<Wallet />, '/carteira');
    const inputValueEl = screen.getByTestId(valueInput);
    const inputDescriptionEl = screen.getByTestId(descriptionInput);
    const buttonEl = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(inputValueEl, '100');
    userEvent.type(inputDescriptionEl, 'one hundred');
    userEvent.click(buttonEl);

    const deleteButtonEl = await screen.findByRole('button', { name: /excluir/i });

    userEvent.click(deleteButtonEl);

    // const descriptionEl = await screen.findByText(/one hundred dollars/i);

    expect(deleteButtonEl).not.toBeInTheDocument();
  });
  test('Se após renderizar tabela o botão editar funciona', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    renderWithRouterAndRedux(<Wallet />, '/carteira');
    const inputValueEl = screen.getByTestId(valueInput);
    const inputDescriptionEl = screen.getByTestId(descriptionInput);
    const buttonEl = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(inputValueEl, '100');
    userEvent.type(inputDescriptionEl, 'one hundred dollars');
    userEvent.click(buttonEl);

    const editButtonEl = await screen.findByRole('button', { name: /editar/i });

    userEvent.click(editButtonEl);

    const saveEditButtonEl = await screen.findByRole('button', { name: /editar despesa/i });

    expect(saveEditButtonEl).toBeInTheDocument();
  });
  test('Se o botão editar despesa funciona', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    renderWithRouterAndRedux(<Wallet />, '/carteira');
    const inputValueEl = screen.getByTestId(valueInput);
    const inputDescriptionEl = screen.getByTestId(descriptionInput);
    const buttonEl = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(inputValueEl, '100');
    userEvent.type(inputDescriptionEl, 'one hundred dollars');
    userEvent.click(buttonEl);

    const editButtonEl = await screen.findByRole('button', { name: /editar/i });

    userEvent.click(editButtonEl);

    const saveEditButtonEl = await screen.findByRole('button', { name: /editar despesa/i });

    userEvent.type(inputValueEl, '200');
    userEvent.type(inputDescriptionEl, 'two hundred dollars');
    userEvent.click(saveEditButtonEl);

    const valueInTheDocument = await screen.getByText(/200\.00/i);
    expect(valueInTheDocument).toBeInTheDocument();
  });
});
