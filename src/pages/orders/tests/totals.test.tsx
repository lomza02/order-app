import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Order from '../Order';
import { OrderProvider } from '../../../context/Order.Context';

test('scoops subtotals', async () => {
  render(<Order type='scoops' />, { wrapper: OrderProvider });
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: /Smak czekoladowy/i,
  });
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /Smak waniliowy/i,
  });
  const subTotDisplay = screen.getByText('Cena lodów: ', { exact: false });
  //defult 0 zł
  expect(subTotDisplay).toHaveTextContent('Cena lodów: 0,00 zł');
  // 1 piece x 2 zł
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '1');
  expect(subTotDisplay).toHaveTextContent('Cena lodów: 2,00 zł');
  // 4 pieces x 2 zł
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '2');
  expect(subTotDisplay).toHaveTextContent('Cena lodów: 8,00 zł');
  // clear input = 0 pieces
  userEvent.clear(vanillaInput);
  userEvent.clear(chocolateInput);
  expect(subTotDisplay).toHaveTextContent('Cena lodów: 0,00 zł');
});

test('toppings subtotals', async () => {
  render(<Order type='toppings' />, { wrapper: OrderProvider });
  const cherryCheckbox = await screen.findByRole('checkbox', {
    name: /Dodatek wiśniowy/i,
  });
  const mMsCheckbox = await screen.findByRole('checkbox', {
    name: /Dodatek m&ms/i,
  });
  const subTotDisplay = screen.getByText('Cena dodatków: ', { exact: false });
  expect(subTotDisplay).toHaveTextContent('Cena dodatków: 0,00 zł');
  // 1 piece x 1 zł
  userEvent.click(cherryCheckbox);
  expect(subTotDisplay).toHaveTextContent('Cena dodatków: 1,00 zł');
  // 2 pieces x 1 zł
  userEvent.click(mMsCheckbox);
  expect(subTotDisplay).toHaveTextContent('Cena dodatków: 2,00 zł');
  // uncheck one of the two check boxes- 1 piece x 1 zł
  userEvent.click(cherryCheckbox);
  expect(subTotDisplay).toHaveTextContent('Cena dodatków: 1,00 zł');
  //uncheck the last checkbox - 0 zł
  userEvent.click(mMsCheckbox);
  expect(subTotDisplay).toHaveTextContent('Cena dodatków: 0,00 zł');
});
