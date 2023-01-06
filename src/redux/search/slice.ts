import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchSliceState } from './types';

const initialState: SearchSliceState = {
    searchInputValue: '',
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        getSearchInputValue: (state, action: PayloadAction<string>) => {
            state.searchInputValue = action.payload;
        },
    },
});

export const { getSearchInputValue } = searchSlice.actions;
export default searchSlice.reducer;
