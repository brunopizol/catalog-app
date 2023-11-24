import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartAction, CartContextType, CartState } from '../types/Cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.cart.findIndex(
        (item) => item.product.id === action.payload.product.id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, cart: updatedCart };
      } else {
        return { ...state, cart: [...state.cart, action.payload] };
      }

    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter((item) => item.product.id !== action.payload) };

    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload };
    default:
      return state;
  }
};

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: [], searchResults: []});

  return (
    <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
  );
};

const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };