import React, {createContext, FunctionComponent, useContext, useState} from 'react';
import {IProduct} from "../_interfaces/product.interface";
import {StateProviderProps, StateContextType, CartItem} from "./@types/state_context.type";


// Doc : https://blog.logrocket.com/how-to-use-react-context-typescript/
const initialContext: StateContextType = {
    cartItems: [],
    showCart: false,
    totalPrice: 0,
    totalQuantities: 0,
    qty: 0,
    increaseQty: () => {},
    decreaseQty: () => {},
    onAdd: (product, quantity) => {}
}

export const StateContext = createContext<StateContextType>(initialContext);

export const StateProvider: FunctionComponent<StateProviderProps> = (
        {children}
    ) => {
    const [showCart, setShowCart] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalQuantities, setTotalQuantities] = useState<number>(0);
    const [qty, setQty] = useState<number>(1);

    const onAdd = (product: IProduct, quantity: number) => {
        // Check if product already exists in cart
        const checkIfProductInCart = cartItems.find(item => item._id === product._id);
        setTotalPrice(prevTotalPrice => prevTotalPrice + (product.price * quantity));
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities + quantity);

        if (checkIfProductInCart) {
            // Update item quantity if product already exists in cart
            const updatedCartItems = cartItems.map((item) => {
                if (item._id === product._id) {
                    return {
                        ...item,
                        quantity: item.quantity + quantity
                    }
                } else {
                    return item;
                }
            });

            // Replace cartItems with updatedCartItems
            setCartItems(updatedCartItems);

        } else {
            // Add new product to cart
            const newCartItem: CartItem = {
                ...product,
                quantity
            }

            setCartItems([...cartItems, { ...newCartItem }]);
        }

    }

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
                onAdd
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

// Work lise a hook
export const useStateProvider = () => useContext(StateContext);

