// Imports
import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: [],
  },
};
// Reducer function to handle cart states
function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      // Add item to cart
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: [...state.cart.cartItems, action.payload],
        },
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  // UseReducer set to control cart items
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
