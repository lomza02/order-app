import { useOrderContext } from '../../../context/Order.Context';
import { Offer } from '../../../models/Offer.model';
import './Price.scss';
interface IPriceProps {
  type: Offer;
}

const Price: React.FunctionComponent<IPriceProps> = ({ type }) => {
  const { scoopsTotalPrice, toppingsTotalPrice } = useOrderContext();
  return (
    <div className='price'>
      Cena
      {type === 'scoops'
        ? ` lodów: ${scoopsTotalPrice}`
        : ` dodatków: ${toppingsTotalPrice}`}
    </div>
  );
};

export default Price;
