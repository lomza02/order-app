import { render, screen } from '@testing-library/react';
import Confirmation from '../Confirmation';
import { OrderProvider } from '../../../context/Order.Context';
import { server } from '../../../mocks/server';
import { rest } from 'msw';

test('display order number - positive scenario', async () => {
  render(<Confirmation handlePage={jest.fn()} />, { wrapper: OrderProvider });
  const display = await screen.findByText('Twój numer zamówienia: 123455676', {
    exact: false,
  });
  expect(display).toBeInTheDocument();
});

test('display order number - error scenario', async () => {
  server.resetHandlers(
    rest.post('http://localhost:3030/order', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );
  render(<Confirmation handlePage={jest.fn()} />, { wrapper: OrderProvider });
  const display = await screen.findByText(
    'Wystąpił błąd podczas pobierania danych'
  );
  expect(display).toBeInTheDocument();
});
