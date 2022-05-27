import React from "react";
import {IProduct} from "../../_interfaces/product.interface";

export type StateContextType = {
    showCart: boolean;
    cartItems: CartItem[];
    totalPrice: number;
    totalQuantities: number;
    qty: number;
    increaseQty: () => void;
    decreaseQty: () => void;
    onAdd: (product: IProduct, quantity: number) => void;
    setShowCart: (showCart: boolean) => void;
    updateQtyCartItem: (id:string, action: string) => void;
    onRemove: (product: CartItem) => void;
}

export type StateProviderProps = {
    children: React.ReactNode;
}

export interface CartItem extends IProduct {
    quantity: number;
}
