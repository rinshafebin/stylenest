import { createContext, useState, useContext } from "react";

const cartContext = createContext();

export const UseCart = () => useContext(cartContext);

export const CartProvider = ({ children }) => {
    const [cartCount , setCartCount]=useState(0);
    return(
        <cartContext.Provider value ={{ cartCount ,setCartCount}}>
            {children}
        </cartContext.Provider>
    )
}