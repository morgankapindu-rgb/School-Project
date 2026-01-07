import { createContext, useState, useEffect } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    // Initialize cart items from localStorage if available
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || {};
    const [cartItems, setCartItems] = useState(storedCart);
    
    // URL for the API
    const url = "http://localhost:4000";

    // Handle token in localStorage
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    // Add item to the cart
    const addToCart = (itemId) => {
        const updatedCart = {
            ...cartItems,
            [itemId]: (cartItems[itemId] || 0) + 1,
        };
        setCartItems(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Store cart in localStorage
    };

    // Remove item from the cart
    const removeFromCart = (itemId) => {
        const updatedCart = { ...cartItems };
        if (!updatedCart[itemId] || updatedCart[itemId] <= 1) {
            delete updatedCart[itemId]; // Remove item if quantity is 0
        } else {
            updatedCart[itemId] -= 1;
        }
        setCartItems(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Store cart in localStorage
    };

    // Get total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                const itemInfo = food_list.find((product) => product._id === itemId);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[itemId];
                }
            }
        }
        return totalAmount;
    };

    // Update token and persist it in localStorage
    const updateToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem("token", newToken); // Store token in localStorage
    };

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken: updateToken, // Replace setToken with updateToken to save it to localStorage
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
