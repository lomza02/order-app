import { useEffect, useState } from 'react';

interface IOrderProps {
  type: string;
}

const Order: React.FunctionComponent<IOrderProps> = ({ type }) => {
  const [items, setItems] = useState<{ name: string; imagePath: string }[]>([]);
  useEffect(() => {
    (async function fetchItems() {
      try {
        let res = await fetch(`http://localhost:3030/${type}`);
        res = await res.json();
        setItems(res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [type]);

  return (
    <div>
      {items.map((item) => {
        return (
          <div key={item.name}>
            <img
              src={item.imagePath}
              alt={`${item.name.toLowerCase()} ${
                type === 'scoops' ? 'smak' : 'dodatek'
              }`}
            />
            <h4>Smak: {item.name}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Order;
