import Order from './Order';

interface IOrdersProps {}

const Orders: React.FunctionComponent<IOrdersProps> = () => {
  return (
    <>
      <Order type='scoops' />
      <Order type='toppings' />
    </>
  );
};

export default Orders;
