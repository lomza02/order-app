import React, { useState, useEffect, useContext } from 'react';
import { ICountItem } from '../models/ICountItem.model';

const OrderContext = React.createContext({});

const countTotal = (mapObj: Map<string, ICountItem>) => {
  let total = 0;
  mapObj.forEach((value) => {
    total += value.amount * value.price;
  });
  return total;
};

const formatPrice = (price: number) => {
  const newPrice = new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  }).format(price);
  return newPrice;
};

export function useOrderContext() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }
  return context;
}

export const OrderProvider: React.FunctionComponent = (props) => {
  const [items, setItems] = useState({
    scoops: new Map<string, ICountItem>(),
    toppings: new Map<string, ICountItem>(),
  });
  const zeroPrice = formatPrice(0);
  const [totals, setTotals] = useState({
    scoopsTotalPrice: zeroPrice,
    toppingsTotalPrice: zeroPrice,
    grandTotalPrice: zeroPrice,
  });
  useEffect(() => {
    const scoopsTotalPrice = countTotal(items.scoops);
    const toppingsTotalPrice = countTotal(items.toppings);
    const grandTotalPrice = scoopsTotalPrice + toppingsTotalPrice;
    setTotals({
      scoopsTotalPrice: formatPrice(scoopsTotalPrice),
      toppingsTotalPrice: formatPrice(toppingsTotalPrice),
      grandTotalPrice: formatPrice(grandTotalPrice),
    });
  }, [items]);

  const updateItems = (
    name: string,
    price: number,
    amount: number,
    type: string
  ) => {
    const newItems = { ...items };
    newItems[type].set(name, { amount: amount, price: price });
    setItems(newItems);
  };
  return (
    <OrderContext.Provider
      value={{ ...totals, ...items, updateItems }}
      {...props}
    />
  );
};
