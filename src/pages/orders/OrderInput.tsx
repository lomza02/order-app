import { useState } from 'react';
import { IItem } from '../../models/IItem.model';
import { useOrderContext } from '../../context/Order.Context';
import { Offer } from '../../models/Offer.model';
import './OrderInput.scss';
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
        //conditions
        const rules: {
          condition: boolean;
          msg: string;
          clearInput: boolean;
        }[] = [
          {
            condition: amount < 0,
            msg: 'Ilość nie może być liczbą ujemną',
            clearInput: true,
          },
          {
            condition: amount === 0,
            msg: 'Ilość nie może być zerem',
            clearInput: true,
          },
          {
            condition: amount >= 1000,
            msg: 'Ilość musi być mniejsza niż 1000',
            clearInput: false,
          },
          {
            condition: amount % 1 !== 0,
            msg: 'Ilość musi być liczbą całkowitą',
            clearInput: true,
          },
        ];
        //validation
        for (const rule of rules) {
          if (rule.condition) {
            if (rule.clearInput) {
              e.currentTarget.value = '';
              updateItems(name, price, 0, type);
            }
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
    <div className='input'>
      <label htmlFor={name} className='input__label'>
        {type === 'scoops' ? 'Smak' : 'Dodatek'} {name.toLowerCase()}
      </label>
      <input
        className='input__input'
        type={type === 'scoops' ? 'number' : 'checkbox'}
        onChange={handleInput}
        id={name}
      />
      {type === 'scoops' && errorText !== '' ? (
        <p className='input__alert' role='alert'>
          {errorText}
        </p>
      ) : null}
    </div>
  );
};

export default OrderInput;
