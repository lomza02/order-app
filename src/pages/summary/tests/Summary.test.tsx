import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Summary from '../Summary';
import App from '../../../App';
import { OrderProvider } from '../../../context/Order.Context';

test('if checkbox is checked button is active', async () => {
  render(<Summary handlePage={jest.fn()} />, { wrapper: OrderProvider });
  const checkbox = screen.getByRole('checkbox', {
    name: 'Akceptuję regulamin',
  });
  const button = screen.getByRole('button', { name: 'Dalej' });
  //default checkbox is unchecked and buttton disbaled
  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
  //on checked checkbox button is abled
  userEvent.click(checkbox);
  expect(button).toBeEnabled();
  //on click disabled again
  userEvent.click(checkbox);
  expect(button).toBeDisabled();
});
