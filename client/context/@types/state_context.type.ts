import React from "react";
import {Product} from "../../_models/product.model";

export type StateContextType = {
    showCart: boolean;
    cartItems: Product[];
    totalPrice: number;
    totalQuantities: number;
    qty: number;
    increaseQty: () => void;
    decreaseQty: () => void;
}

export type StateProviderProps = {
    children: React.ReactNode;
}
