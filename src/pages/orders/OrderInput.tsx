import { useState } from 'react';
import { IItem } from '../../models/IItem.model';
import { useOrderContext } from '../../context/Order.Context';
import { Offer } from '../../models/Offer.model';
interface IOrderInputProps {
  type: Offer;
  name: string;
  items: IItem[];
}

const OrderInput: React.FunctionComponent<IOrderInputProps> = ({
  type,
  name,
  items,
}) => {
  const [errorText, setErrorText] = useState<string>('');
  const { updateItems } = useOrderContext();
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const itemToUpdate = items.find((item: IItem) => item.name === name);
    if (itemToUpdate) {
      const name: string = e.currentTarget.id;
      const price: number = itemToUpdate.price;
      const amount: number =
        type === 'scoops'
          ? +e.currentTarget.value
          : Number(e.currentTarget.checked);
      if ((amount && updateItems) || (amount === 0 && updateItems)) {
        //condtions
        const rules: {
          condition: boolean;
          msg: string;
        }[] = [
          { condition: amount < 0, msg: 'Ilość nie może być liczbą ujemną' },
          { condition: amount === 0, msg: 'Ilość nie może być zerem' },
          {
            condition: amount % 1 !== 0,
            msg: 'Ilość musi być liczbą całkowitą',
          },
        ];
        //validation
        for (const rule of rules) {
          if (rule.condition) {
            e.currentTarget.value = '';
            updateItems(name, price, 0, type);
            setErrorText('');
            return setErrorText(rule.msg);
          }
        }
        updateItems(name, price, amount, type);
        setErrorText('');
      }
    }
  };
  return (
    <>
      <label htmlFor={name}>
        {type === 'scoops' ? 'Smak' : 'Dodatek'} {name.toLowerCase()}
      </label>
      <input
        type={type === 'scoops' ? 'number' : 'checkbox'}
        onChange={handleInput}
        id={name}
      />
      {type === 'scoops' && errorText !== '' ? (
        <p role='alert'>{errorText}</p>
      ) : null}
    </>
  );
};

export default OrderInput;
