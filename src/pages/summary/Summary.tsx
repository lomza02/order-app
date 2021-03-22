import { useState, useEffect } from 'react';
import { useOrderContext } from '../../context/Order.Context';
import { ICountItem } from '../../models/ICountItem.model';
import Button from '../common/components/Button';
import List from './List';
import './Summary.scss';

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

  return (
    <div className='summary'>
      <div className='summary__border'>
        <h2 className='summary__header'>Lody: {scoopsTotalPrice}</h2>
        <List nestedArr={scoopsArr} />
        <h2 className='summary__header'>Dodatki: {toppingsTotalPrice}</h2>
        <List nestedArr={toppingsArr} />
        <div className='summary__line'></div>
        <h1 className='summary__header summary__header--bigger'>
          Suma: {grandTotalPrice}
        </h1>

        <div className='summary__wrapper'>
          <label htmlFor='accept-rules' className='summary__label'>
            Akceptuję regulamin
          </label>
          <input
            className='summary__checkbox'
            id='accept-rules'
            type='checkbox'
            checked={checked}
            onChange={handleInput}
          />
        </div>
        <Button disabled={!checked} onClick={() => handlePage('confirmation')}>
          Dalej
        </Button>
      </div>
    </div>
  );
};

export default Summary;
