import Order from './Order';

interface IOrdersProps {}

const Orders: React.FunctionComponent<IOrdersProps> = (props) => {
  return (
    <>
      <Order type='scoops' />
      <Order type='toppings' />
    </>
  );
};

export default Orders;
