export type PizzaItem = {
    category?: number;
    id: number;
    imageUrl: string;
    ingredients?: string;
    name: string;
    price: number;
    rating?: number;
    sizes: number[];
    types: number[];
};

export type FetchPizzasArgs = Record<string, string>;

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}
