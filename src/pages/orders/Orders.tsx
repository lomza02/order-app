import Order from './Order';
import { useOrderContext } from '../../context/Order.Context';

interface IOrdersProps {
  handlePage: (route: string) => any;
}

const Orders: React.FunctionComponent<IOrdersProps> = ({ handlePage }) => {
  const { grandTotalPrice, isOrderValid } = useOrderContext();
  return (
    <>
      <Order type='scoops' />
      <Order type='toppings' />
      <div>
        <h2>Suma: {grandTotalPrice}</h2>
      </div>
      <div>
        <button disabled={!isOrderValid} onClick={() => handlePage('summary')}>
          Dalej
        </button>
      </div>
    </>
  );
};

export default Orders;
