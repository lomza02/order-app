import Orders from './pages/orders/Orders';
import Summary from './pages/summary/Summary';
import Confirmation from './pages/confirmation/Confirmation';
import { useState } from 'react';
import { OrderProvider } from './context/Order.Context';
import './App.scss';

const App = () => {
  const [activePage, setActivePage] = useState('orders');
  const handlePage = (route: string) => {
    setActivePage(route);
  };
  function renderSwitch(page: string) {
    switch (page) {
      case 'orders':
        return <Orders handlePage={handlePage} />;
      case 'summary':
        return <Summary handlePage={handlePage} />;
      case 'confirmation':
        return <Confirmation handlePage={handlePage} />;
      default:
        return <div>Nie znaleziono strony</div>;
    }
  }
  return (
    <div className='app'>
      <div className='app__main'>
        <OrderProvider>{renderSwitch(activePage)}</OrderProvider>
      </div>
    </div>
  );
};

export default App;
