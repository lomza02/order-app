import * as React from 'react';
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
  const { updateItems } = useOrderContext();
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const name = e.currentTarget.id;
    const price = items.find((item: IItem) => item.name === name).price;
    const amount =
      type === 'scoops'
        ? e.currentTarget.value
        : Number(e.currentTarget.checked);
    updateItems(name, price, amount, type);
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
    </>
  );
};

export default OrderInput;
