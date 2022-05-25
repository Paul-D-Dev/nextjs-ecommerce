import React, {createContext, FunctionComponent, useState} from 'react';
import {StateContextProps, StateContextType} from "./@types/state_context.type";


const Context = createContext<StateContextType | null>(null);

export const StateContext: FunctionComponent<StateContextProps> = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
            }}
        >
            {children}
        </Context.Provider>
    )
}

