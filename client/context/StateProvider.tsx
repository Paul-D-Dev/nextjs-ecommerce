import React, {createContext, FunctionComponent, useContext, useState} from 'react';
import {StateProviderProps, StateContextType} from "./@types/state_context.type";


export const StateContext = createContext<StateContextType>({} as StateContextType);

export const StateProvider: FunctionComponent<StateProviderProps> = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    const increaseQty = () => {
        setQty(prevQty => prevQty + 1);
    }

    const decreaseQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1;
        });
    }

    return (
        <StateContext.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                increaseQty,
                decreaseQty,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

// Work lise a hook
export const useStateProvider = () => useContext(StateContext);

