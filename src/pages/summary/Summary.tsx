import { useState, useEffect } from 'react';
import { useOrderContext } from '../../context/Order.Context';
import { ICountItem } from '../../models/ICountItem.model';
interface ISummaryProps {
  handlePage: (route: string) => any;
}

const Summary: React.FunctionComponent<ISummaryProps> = ({ handlePage }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [scoopsArr, setScoopsArr] = useState<[string, ICountItem][]>([]);
  const [toppingsArr, setToppingsArr] = useState<[string, ICountItem][]>([]);
  const {
    scoops,
    toppings,
    grandTotalPrice,
    scoopsTotalPrice,
    toppingsTotalPrice,
  } = useOrderContext();
  useEffect(() => {
    if (scoops && toppings) {
      setScoopsArr(Array.from(scoops.entries()));
      setToppingsArr(Array.from(toppings.entries()));
    }
  }, [scoops, toppings]);
  const handleInput = () => {
    setChecked(!checked);
  };
  const renderList = (nestedArr: [string, ICountItem][]) => {
    if (nestedArr.length > 0) {
      return (
        <ul>
          {nestedArr.map((item) => (
            <li key={item[0]}>
              {item[0]} {item[1].amount} x {item[1].price} zł
            </li>
          ))}
        </ul>
      );
    } else {
      return <div>brak dodatków</div>;
    }
  };

  return (
    <div>
      <h2>Lody: {scoopsTotalPrice}</h2>
      {renderList(scoopsArr)}
      <h2>Dodatki: {toppingsTotalPrice}</h2>
      {renderList(toppingsArr)}
      <h1>Suma: {grandTotalPrice}</h1>
      <label htmlFor='accept-rules'>Akceptuję regulamin</label>
      <input
        id='accept-rules'
        type='checkbox'
        checked={checked}
        onChange={handleInput}
      />
      <button disabled={!checked} onClick={() => handlePage('confirmation')}>
        Dalej
      </button>
    </div>
  );
};

export default Summary;
