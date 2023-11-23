import { Product } from "./Product";

export type CartItem = {
    product: Product
    quantity: number;
};

export type CartState = {
    cart: CartItem[];
};

export type CartAction =
    | { type: 'ADD_TO_CART'; payload: CartItem }
    | { type: 'REMOVE_FROM_CART'; payload: number };

export type CartContextType = {
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
};