import { RootState } from '../store';

export const cartSelector = (state: RootState) => state.cart;
export const cartStateSelector = (state: RootState) => state.cart.cartState;
