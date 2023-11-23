type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
  };
  
  type CartState = {
    cart: CartItem[];
  };
  
  type CartAction =
    | { type: 'ADD_TO_CART'; payload: CartItem }
    | { type: 'REMOVE_FROM_CART'; payload: number };
  
  type CartContextType = {
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
  };