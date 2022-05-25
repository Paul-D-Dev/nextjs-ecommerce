import React, {createContext, FunctionComponent, useState} from 'react';
import {StateProviderProps, StateContextType} from "./@types/state_context.type";


export const StateContext = createContext<StateContextType | null>(null);

export const StateProvider: FunctionComponent<StateProviderProps> = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    return (
        <StateContext.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

