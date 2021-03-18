import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Czekoladowy', imagePath: '/images/chocolate.png' },
        { name: 'Waniliowy', imagePath: '/images/vanilla.png' },
      ])
    );
  }),
  rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Wiśniowy', imagePath: '/images/cherries.png' },
        { name: 'M&Ms-owy', imagePath: '/images/m-and-ms.png' },
        { name: 'Krówkowy', imagePath: '/images/hot-fudge.png' },
      ])
    );
  }),
  rest.post('http://localhost:3030/order', (req, res, ctx) => {
    return res(ctx.json({ orderNumber: 123455676 }));
  }),
];
