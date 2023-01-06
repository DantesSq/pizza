export interface FilterSliceState {
    sortType: number;
    arrSort: string[];
    sort: string[];
    activeIndex: number;
    currentPage: number;
    pizzaPerPage: number;
    pages: undefined[];
}

export type Params = {
    category: string;
    sort: string;
    order: string;
    page: string;
};
