import { screen, render, act } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { OrderProvider } from '../context/Order.Context';

test('test positive scenario', async () => {
  const promise = Promise.resolve();
  await act(async () => {
    render(<App />, { wrapper: OrderProvider });
    await promise;
  });
  //Orders
  const scoopChocolateInput = await screen.findByRole('spinbutton', {
    name: /Smak czekoladowy/i,
  });
  const cherryCheckbox = await screen.findByRole('checkbox', {
    name: /Dodatek wiśniowy/i,
  });
  const mMsCheckbox = await screen.findByRole('checkbox', {
    name: /Dodatek m&ms/i,
  });
  const scoopVanillaInput = await screen.findByRole('spinbutton', {
    name: /Smak waniliowy/i,
  });
  userEvent.clear(scoopChocolateInput);
  userEvent.type(scoopChocolateInput, '1');
  userEvent.clear(scoopVanillaInput);
  userEvent.type(scoopVanillaInput, '1');
  userEvent.click(cherryCheckbox);
  userEvent.click(mMsCheckbox);
  const buttonOrders = screen.getByRole('button', { name: 'Dalej' });
  userEvent.click(buttonOrders);
  //Summary
  const termsCheckbox = screen.getByRole('checkbox', {
    name: 'Akceptuję regulamin',
  });
  const buttonSummary = screen.getByRole('button', { name: 'Dalej' });
  userEvent.click(termsCheckbox);
  userEvent.click(buttonSummary);
  //Confirmation
  const buttonConfirmation = screen.getByRole('button', {
    name: 'Wróć do zakupów',
  });
  userEvent.click(buttonConfirmation);
  //grand total should be equal 0,00
  const grandTotalDisplay = screen.getByText('Suma: ', { exact: false });
  expect(grandTotalDisplay).toHaveTextContent('Suma: 0,00 zł');
});
