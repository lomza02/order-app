import React, { useState } from 'react';
import { IItem } from '../../models/IItem.model';
import { useOrderContext } from '../../context/Order.Context';

interface IOrderInputProps {
  type: string;
  name: string;
  items: IItem[];
}

const OrderInput: React.FunctionComponent<IOrderInputProps> = ({
  type,
  name,
  items,
}) => {
  const [errorText, setErrorText] = useState('');
  const { updateItems } = useOrderContext();
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const name: string = e.currentTarget.id;
    const price: number = items.find((item: IItem) => item.name === name).price;
    const amount: number =
      type === 'scoops'
        ? e.currentTarget.value
        : Number(e.currentTarget.checked);
    if (amount < 0) {
      return setErrorText('Ilość musi być większa niż zero');
    } else if (amount % 1 !== 0) {
      return setErrorText('Ilość musi być liczbą całkowitą');
    }
    updateItems(name, price, amount, type);
    setErrorText('');
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
      {errorText ? <p role='alert'>{errorText}</p> : null}
    </>
  );
};

export default OrderInput;
