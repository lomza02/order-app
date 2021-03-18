import Orders from './pages/orders/Orders';
import { OrderProvider } from './context/Order.Context';

const App: React.FunctionComponent = () => {
  return (
    <div className='App'>
      <OrderProvider>
        <Orders />
      </OrderProvider>
    </div>
  );
};

export default App;
