import { render, screen } from '@testing-library/react';
import Order from '../Order';

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
