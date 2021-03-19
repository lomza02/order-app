import { render, screen, act } from '@testing-library/react';
import Orders from '../Orders';
import userEvent from '@testing-library/user-event';
import { OrderProvider } from '../../../context/Order.Context';

describe('test switching to next section', () => {
  test('if the information is complete the button is active', async () => {
    const promise = Promise.resolve();
    await act(async () => {
      render(<Orders />, { wrapper: OrderProvider });
      await promise;
    });
    //user cannot buy just toppings so we check the scoops
    const chocolateInput = await screen.findByRole('spinbutton', {
      name: /Smak czekoladowy/i,
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '1');
    const btn = screen.getByRole('button', { name: 'Dalej' });
    expect(btn).toBeEnabled();
    //clear the input
    userEvent.clear(chocolateInput);

    expect(btn).toBeDisabled();
  });
});
