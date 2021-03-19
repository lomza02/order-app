import { useEffect, useState } from 'react';
import { IItem } from '../../models/IItem.model';
import { useOrderContext } from '../../context/Order.Context';
import OrderInput from './OrderInput';

interface IOrderProps {
  type: string;
}

const Order: React.FunctionComponent<IOrderProps> = ({ type }) => {
  const [items, setItems] = useState<IItem[]>([]);
  const [error, setError] = useState<boolean>(false);
  const { scoopsTotalPrice, toppingsTotalPrice } = useOrderContext();
  useEffect(() => {
    (async function fetchItems() {
      try {
        let res = await fetch(`http://localhost:3030/${type}`);
        res = await res.json();
        setItems(res);
      } catch (error) {
        setError(true);
      }
    })();
  }, [type]);

  if (error) {
    return <div role='alert'>Wystąpił błąd podczas pobierania danych</div>;
  }
  return (
    <div>
      {items.map((item: IItem) => {
        return (
          <div key={item.name}>
            <div>
              <img
                src={item.imagePath}
                alt={`${item.name.toLowerCase()} ${
                  type === 'scoops' ? 'smak' : 'dodatek'
                }`}
              />
              <span>{item.price} zł / szt.</span>
              <OrderInput type={type} name={item.name} items={items} />
            </div>
          </div>
        );
      })}
      <div>
        Cena
        {type === 'scoops'
          ? ` lodów: ${scoopsTotalPrice}`
          : ` dodatków: ${toppingsTotalPrice}`}
      </div>
    </div>
  );
};

export default Order;
