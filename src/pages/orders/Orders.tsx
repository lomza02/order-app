import Order from './Order';
import { useOrderContext } from '../../context/Order.Context';

interface IOrdersProps {}

const Orders: React.FunctionComponent<IOrdersProps> = () => {
  const { grandTotalPrice } = useOrderContext();
  return (
    <>
      <Order type='scoops' />
      <Order type='toppings' />
      <div>
        <h2>Suma: {grandTotalPrice}</h2>
      </div>
    </>
  );
};

export default Orders;
