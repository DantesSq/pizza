import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { PizzaItem, Status, FetchPizzasArgs } from './types';

export interface PizzaSliceState {
    items: PizzaItem[];
    status: Status;
}

export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzasArgs>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const { search, sortBy, order, category } = params;
        const { data } = await axios.get(
            `https://6341a70016ffb7e275d5902f.mockapi.io/items${
                sortBy + '&order=' + order + category + search
            }`,
        );

        return data;
    },
);

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING;

            state.items = [];
        });

        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.items = action.payload;
        });

        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    },
});

export default pizzaSlice.reducer;
