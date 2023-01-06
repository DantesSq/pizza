export type CartItemType = {
    key?: string;
    name: string;
    price: number;
    imageUrl: string;
    size: number;
    doughType: string;
    amount: number;
};

export interface CartSliceState {
    cartState: CartItemType[];
    totalPizzas: number;
    totalPrice: number;
}
