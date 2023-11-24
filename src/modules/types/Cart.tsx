import { Product } from "./Product";

export type CartItem = {
    product: Product
    quantity: number;
};

export type CartState = {
    cart: CartItem[];
    searchResults: Product[];
};

export type CartAction =
    | { type: 'ADD_TO_CART'; payload: CartItem }
    | { type: 'REMOVE_FROM_CART'; payload: number }
    | { type: 'SET_SEARCH_RESULTS'; payload: Product[] };

export type CartContextType = {
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
};