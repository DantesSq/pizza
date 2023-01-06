import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemType, CartSliceState } from './types';

const initialState: CartSliceState = {
    cartState: [],
    totalPizzas: 0,
    totalPrice: 0,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setAmount(
            state,
            action: PayloadAction<{
                id: number;
                act: string;
            }>,
        ) {
            const { id, act } = action.payload;

            if (act === 'minus') {
                if (state.cartState[id].amount === 1) {
                    state.cartState.splice(id, 1);
                    return;
                } else state.cartState[id].amount -= 1;
            }
            if (act === 'plus') state.cartState[id].amount += 1;
            if (act === 'remove') state.cartState.splice(id, 1);
        },
        clearCart(state) {
            state.cartState = [];
        },
        addPizza(state, action: PayloadAction<CartItemType>) {
            for (let i in state.cartState) {
                if (state.cartState[i].key === action.payload.key) {
                    console.log(`${state.cartState[i].key} === ${action.payload.key}`);
                    state.cartState[i].amount += 1;
                    return;
                }
            }

            state.cartState.push(action.payload);
        },
        setTotalPizzas(state) {
            state.totalPizzas = state.cartState.reduce((acc, el) => acc + el.amount, 0);
        },
        setTotalPrice(state) {
            state.totalPrice = state.cartState.reduce((acc, el) => acc + el.amount * el.price, 0);
        },
        onSaveCart(state, action: PayloadAction<CartItemType[]>) {
            state.cartState = action.payload;
        },
    },
});

export const { setAmount, clearCart, addPizza, setTotalPizzas, setTotalPrice, onSaveCart } =
    cartSlice.actions;

export default cartSlice.reducer;
