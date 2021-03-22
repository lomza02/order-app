import { ICountItem } from '../../models/ICountItem.model';
import './List.scss';

interface IListProps {
  nestedArr: [string, ICountItem][];
}
const List: React.FunctionComponent<IListProps> = ({ nestedArr }) => {
  if (nestedArr.length === 0) {
    return <div>brak dodatków</div>;
  }
  return (
    <ul className='list'>
      {nestedArr.map((item) => (
        <li key={item[0]} className='list__item'>
          {item[0]} {item[1].amount} x {item[1].price} zł
        </li>
      ))}
    </ul>
  );
};

export default List;
