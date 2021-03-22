import * as React from 'react';
import { useOrderContext } from '../../../context/Order.Context';
import Button from '../../common/components/Button';
import './Sum.scss';
interface ISumProps {
  handlePage: (active: string) => void;
}

const Sum: React.FunctionComponent<ISumProps> = ({ handlePage }) => {
  const { grandTotalPrice, isOrderValid } = useOrderContext();
  return (
    <div className='sum'>
      <div className='sum__wrapper'>
        <h2 className='sum__header'>Suma: {grandTotalPrice}</h2>
      </div>
      <div className='sum__wrapper'>
        <Button disabled={!isOrderValid} onClick={handlePage}>
          Dalej
        </Button>
      </div>
    </div>
  );
};

export default Sum;
