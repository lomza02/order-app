import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Czekoladowy', imagePath: '/images/chocolate.png', price: 2 },
        { name: 'Waniliowy', imagePath: '/images/vanilla.png', price: 2 },
      ])
    );
  }),
  rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Wiśniowy', imagePath: '/images/cherries.png', price: 1 },
        { name: 'M&Ms-owy', imagePath: '/images/m-and-ms.png', price: 1 },
        { name: 'Krówkowy', imagePath: '/images/hot-fudge.png', price: 1 },
      ])
    );
  }),
  rest.post('http://localhost:3030/order', (req, res, ctx) => {
    return res(ctx.json({ orderNumber: 123455676 }));
  }),
];
