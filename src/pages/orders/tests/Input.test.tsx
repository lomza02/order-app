import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Order from '../Order';
import { OrderProvider } from '../../../context/Order.Context';

test('scoops input validation', async () => {
  render(<Order type='scoops' />, { wrapper: OrderProvider });
  const scoopChocolateInput = await screen.findByRole('spinbutton', {
    name: /Smak czekoladowy/i,
  });
  //if amount is < 0
  userEvent.clear(scoopChocolateInput);
  userEvent.type(scoopChocolateInput, '-1');
  expect(
    screen.getByText('Ilość nie może być liczbą ujemną')
  ).toBeInTheDocument();
  expect(
    screen.queryByText('Ilość musi być liczbą całkowitą')
  ).not.toBeInTheDocument();

  //if amount is not intiger number
  userEvent.clear(scoopChocolateInput);
  userEvent.type(scoopChocolateInput, '1.1');
  expect(
    screen.getByText('Ilość musi być liczbą całkowitą')
  ).toBeInTheDocument();
  expect(
    screen.queryByText('Ilość nie może być liczbą ujemną')
  ).not.toBeInTheDocument();

  //if value is valid errors are hidden
  userEvent.clear(scoopChocolateInput);
  userEvent.type(scoopChocolateInput, '1');
  expect(
    screen.queryByText('Ilość nie może być liczbą ujemną')
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText('Ilość musi być liczbą całkowitą')
  ).not.toBeInTheDocument();
});
