import React from "react";
import {Product} from "../../_models/product.model";

export type StateContextType = {
    showCart: boolean;
    cartItems: Product[];
    totalPrice: number;
    totalQuantities: number;
    qty: number;
}

export type StateContextProps = {
    children: React.ReactNode;
}
