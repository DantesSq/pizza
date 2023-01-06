import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState, Params } from './types';

const initialState: FilterSliceState = {
    sortType: 0,
    arrSort: ['rating', '-rating', 'price', '-price', 'name', '-name'],
    sort: [
        'popular (ESC)',
        'popular (DESC)',
        'price (ESC)',
        'price (DESC)',
        'alphabet (ESC)',
        'alphabet (DESC)',
    ],
    activeIndex: 0,
    currentPage: 1,
    pizzaPerPage: 4,
    pages: [undefined],
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSortType(state, action: PayloadAction<number>) {
            state.sortType = action.payload;
        },
        setActiveIndex(state, action: PayloadAction<number>) {
            state.activeIndex = action.payload;
            state.currentPage = 1;
        },
        setParameters(state, action: PayloadAction<Params>) {
            let page = Number(action.payload.page);
            state.activeIndex = Number(action.payload.category);
            state.sortType = state.arrSort.indexOf(action.payload.sort);
            state.currentPage = page;
        },
        setPages(state, action: PayloadAction<number>) {
            state.pages = [...new Array(action.payload)];
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setCurrentPageNext(state) {
            if (state.currentPage < state.pages.length) state.currentPage++;
        },
        setCurrentPagePrev(state) {
            if (state.currentPage > 1) state.currentPage--;
        },
    },
});

export const {
    setSortType,
    setActiveIndex,
    setParameters,
    setPages,
    setCurrentPage,
    setCurrentPageNext,
    setCurrentPagePrev,
} = filterSlice.actions;

export default filterSlice.reducer;
