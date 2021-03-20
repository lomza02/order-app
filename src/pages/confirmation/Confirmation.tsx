import { useEffect, useState } from 'react';
import { useOrderContext } from '../../context/Order.Context';

interface IConfirmationProps {
  handlePage: (route: string) => any;
}

const Confirmation: React.FunctionComponent<IConfirmationProps> = ({
  handlePage,
}) => {
  const [error, setError] = useState<boolean>(false);
  const [code, setCode] = useState();
  const { clearItems } = useOrderContext();
  useEffect(() => {
    (async function fetchData() {
      try {
        const res = await fetch('http://localhost:3030/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
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
    <div>
      <div>Twój numer zamówienia: {code}</div>
      <button onClick={handleBtn}>Wróć do zakupów</button>
    </div>
  );
};

export default Confirmation;
