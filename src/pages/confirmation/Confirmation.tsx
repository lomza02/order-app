import { useEffect, useState } from 'react';
import { useOrderContext } from '../../context/Order.Context';
import Button from '../common/components/Button';
import './Confirmation.scss';

interface IConfirmationProps {
  handlePage: (route: string) => any;
}

const Confirmation: React.FunctionComponent<IConfirmationProps> = ({
  handlePage,
}) => {
  const [error, setError] = useState<boolean>(false);
  const [code, setCode] = useState('ładowanie...');
  const { clearItems } = useOrderContext();

  useEffect(() => {
    (async function fetchData() {
      try {
        const res = await fetch(
          (process.env.REACT_APP_BACKEND as string) + '/order',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const parseRes = await res.json();
        setCode(parseRes.orderNumber);
      } catch {
        setError(true);
      }
    })();
  }, []);
  const handleBtn = () => {
    if (clearItems) {
      clearItems();
      handlePage('orders');
    }
  };
  if (error) {
    return <div>Wystąpił błąd podczas pobierania danych</div>;
  }
  return (
    <div className='confirmation'>
      <div className='confirmation__information'>
        Twój numer zamówienia: {code}
      </div>
      <Button onClick={handleBtn}>Wróć do zakupów</Button>
    </div>
  );
};

export default Confirmation;
