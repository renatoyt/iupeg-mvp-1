import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface CartItemsDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface State {
  cartItems: CartItemsDTO[];
}

interface Action {
  type:
  | 'addItem'
  | 'removeItem'
  | 'increment'
  | 'decrement'
  | 'checkout'
  | 'clear';
  product?: CartItemsDTO;
}

const Storage = async (cartItems: CartItemsDTO[]): Promise<void> => {
  await AsyncStorage.setItem(
    'cart',
    JSON.stringify(cartItems.length > 0 ? cartItems : []),
  );
};

const sumItems = (cartItems: CartItemsDTO[]): any => {
  Storage(cartItems);
  const itemCount = cartItems.reduce(
    (total, product) => total + product.quantity,
    0,
  );
  const totalPrice = cartItems
    .reduce((price, product) => price + product.price * product.quantity, 0)
    .toFixed(2);
  return { itemCount, totalPrice };
};

const CartReducer = (state: CartItemsDTO[], action: Action): any | State => {
  switch (action.type) {
    case 'addItem':
      if (!state.find(item => item.id === action.product?.id)) {
        if (action.product) {
          state.push({
            ...action.product,
            quantity: 1,
          });
        }
      }

      return {
        ...state,
        ...sumItems(state),
        cartItems: [...state],
      };
    case 'removeItem':
      return {
        ...state,
        ...sumItems(
          state.cartItems.filter(item => item.id !== action.product?.id),
        ),
        cartItems: [
          ...state.cartItems.filter(item => item.id !== action.product?.id),
        ],
      };
    case 'increment':
      // eslint-disable-next-line no-param-reassign
      state.cartItems[
        state.cartItems.findIndex(item => item.id === action.product?.id)
      ].quantity += 1;
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case 'decrement':
      // eslint-disable-next-line no-param-reassign
      state.cartItems[
        state.cartItems.findIndex(item => item.id === action.product?.id)
      ].quantity -= 1;
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case 'checkout':
      return {
        cartItems: [],
        checkout: true,
        ...sumItems([]),
      };
    case 'clear':
      return {
        cartItems: [],
        ...sumItems([]),
      };
    default:
      return state;
  }
};

export { CartReducer, sumItems, CartItemsDTO };
