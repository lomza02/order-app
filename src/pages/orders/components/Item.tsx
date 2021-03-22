import { Offer } from '../../../models/Offer.model';
import { IItem } from '../../../models/IItem.model';
import OrderInput from '../OrderInput';
import './Item.scss';

interface IItemProps {
  name: string;
  imagePath: string;
  price: number;
  type: Offer;
  items: IItem[];
}

const Item: React.FunctionComponent<IItemProps> = ({
  name,
  imagePath,
  type,
  items,
  price,
}) => {
  return (
    <div key={name} className='item'>
      <div className='item__border'>
        <div className='item__img'>
          <img
            className='item__img-photo'
            src={process.env.REACT_APP_BACKEND + imagePath}
            alt={`${name.toLowerCase()} ${
              type === 'scoops' ? 'smak' : 'dodatek'
            }`}
          />
        </div>
        <span className='item__price'>{price} zł / szt.</span>
        <OrderInput type={type} name={name} items={items} />
      </div>
    </div>
  );
};

export default Item;
