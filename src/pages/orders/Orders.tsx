import Order from './Order';
import Sum from './components/Sum';

interface IOrdersProps {
  handlePage: (route: string) => any;
}

const Orders: React.FunctionComponent<IOrdersProps> = ({ handlePage }) => {
  return (
    <div className='wrapper'>
      <Order type='scoops' />
      <Order type='toppings' />
      <Sum handlePage={handlePage} />
    </div>
  );
};

export default Orders;
