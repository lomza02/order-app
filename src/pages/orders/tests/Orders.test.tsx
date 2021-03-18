import { render, screen } from '@testing-library/react';
import Order from '../Order';
import { server } from '../../../mocks/server';
import { rest } from 'msw';

test('display and check alts for scoop images from server', async () => {
  render(<Order type='scoops' />);
  const scoopImgs = (await screen.findAllByRole('img', {
    name: /smak$/i,
  })) as HTMLImageElement[];

  const scoopImgAlts: string[] = scoopImgs.map(
    (img: HTMLImageElement) => img.alt
  );
  expect(scoopImgs).toHaveLength(2);
  expect(scoopImgAlts).toEqual(['czekoladowy smak', 'waniliowy smak']);
});

test('display and check alts for topping images from server', async () => {
  render(<Order type='toppings' />);
  const toppingImgs = (await screen.findAllByRole('img', {
    name: /dodatek$/i,
  })) as HTMLImageElement[];
  const toppingImgsAlts: string[] = toppingImgs.map(
    (img: HTMLImageElement) => img.alt
  );
  expect(toppingImgsAlts).toEqual([
    'wiśniowy dodatek',
    'm&ms-owy dodatek',
    'krówkowy dodatek',
  ]);
});

test('test the error scenario for scoops from the server', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );
  render(<Order type='scoops' />);
  const errorAlert = await screen.findByRole('alert');
  expect(errorAlert).toBeInTheDocument();
});

test('test the error scenario for toppings from the server', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );
  render(<Order type='toppings' />);
  const errorAlert = await screen.findByRole('alert');
  expect(errorAlert).toBeInTheDocument();
});
