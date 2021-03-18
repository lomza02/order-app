import Orders from './pages/orders/Orders';

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <div className='App'>
      <Orders />
    </div>
  );
};

export default App;
