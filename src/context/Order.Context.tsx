import React, { useState, useEffect, useContext, useMemo } from 'react';
import { ICountItem } from '../models/ICountItem.model';
import { Offer } from '../models/Offer.model';

type updateItems = (
  name: string,
  price: number,
  amount: number,
  type: Offer
) => void;

interface IContextProps {
  scoopsTotalPrice: string;
  toppingsTotalPrice: string;
  grandTotalPrice: string;
  scoops: Map<string, ICountItem>;
  toppings: Map<string, ICountItem>;
  updateItems: updateItems;
  isOrderValid: boolean;
  clearItems: () => void;
}

interface ITotals {
  scoopsTotalPrice: string;
  toppingsTotalPrice: string;
  grandTotalPrice: string;
}

const OrderContext = React.createContext<Partial<IContextProps>>({});

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
  const [isOrderValid, setIsOrderValid] = useState(false);
  const zeroPrice: string = formatPrice(0);
  const [totals, setTotals] = useState<ITotals>({
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
    if (scoopsTotalPrice <= 0) {
      setIsOrderValid(false);
    } else {
      setIsOrderValid(true);
    }
  }, [items]);

  const updateItems: updateItems = useMemo(
    () => (name, price, amount, type) => {
      const newItems = { ...items };
      newItems[type].set(name, { amount: amount, price: price });
      setItems(newItems);
    },
    [items]
  );

  const clearItems = useMemo(
    () => () => {
      setItems({
        scoops: new Map<string, ICountItem>(),
        toppings: new Map<string, ICountItem>(),
      });
    },
    []
  );

  const value = useMemo(() => {
    return { ...totals, ...items, updateItems, isOrderValid, clearItems };
  }, [totals, items, updateItems, isOrderValid, clearItems]);
  return <OrderContext.Provider value={value} {...props} />;
};
