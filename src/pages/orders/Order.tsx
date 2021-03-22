import { useEffect, useState } from 'react';
import { IItem } from '../../models/IItem.model';
import { Offer } from '../../models/Offer.model';
import Item from './components/Item';
import Price from './components/Price';
import Error from '../common/components/Error';
import './Order.scss';
interface IOrderProps {
  type: Offer;
}

const Order: React.FunctionComponent<IOrderProps> = ({ type }) => {
  const [items, setItems] = useState<IItem[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    (async function fetchItems() {
      try {
        const res = await fetch(
          (process.env.REACT_APP_BACKEND as string) + `/${type}`
        );
        const parseRes: IItem[] = await res.json();
        setItems(parseRes);
      } catch {
        setError(true);
      }
    })();
  }, [type]);

  if (error) {
    return <Error />;
  }
  return (
    <div className='wrapper'>
      <div className='wrapper__upper'>
        {items.map((item: IItem) => {
          return (
            <Item
              name={item.name}
              imagePath={item.imagePath}
              type={type}
              items={items}
              price={item.price}
              key={item.name}
            />
          );
        })}
      </div>
      <div className='wrapper__lower'>
        <Price type={type} />
      </div>
    </div>
  );
};

export default Order;
