// import React, { createContext, useEffect, useState } from "react";

// export const ShopContext = createContext(null);

// const getDefaultCart = () => {
//     let cart ={};
//     for(let index = 0; index < 300+1; index++){
//         cart[index] = 0;
//     }
//     return cart;
// }

// const ShopContextProvider = (props) => {

    
//     const [cartItems, setCartItems] = useState(getDefaultCart());
//     const [all_product, setAll_Product] = useState([]);

//     useEffect(() => {
//         fetch('http://localhost:4000/allproducts')
//         .then((response) => response.json())
//         .then((data) => setAll_Product(data))

//         if(localStorage.getItem('auth-token')){
//             fetch('http://localhost:4000/getcart',{
//                 method:'POST',
//                 headers:{
//                     Accept:'application/form-data',
//                     'auth-token':`${localStorage.getItem('auth-token')}`,
//                     'Content-Type':'application/json',
//                 },
//                 body:"",
//             })
//             .then((response) => response.json())
//             .then((data) => setCartItems(data));
//         }
//     },[])

//     const addToCart = (itemId) => {
//         setCartItems((prev) => ({...prev,[itemId]:prev[itemId]+1}))
//         if(localStorage.getItem('auth-token')){
//             fetch('http://localhost:4000/addtocart',{
//                 method:'POST',
//                 headers:{
//                     Accept:'application/form-data',
//                     'auth-token':`${localStorage.getItem('auth-token')}`,
//                     'Content-Type':'application/json',
//                 },
//                 body:JSON.stringify({"itemId":itemId}),
//             })
//             .then((response) => response.json())
//             .then((data) => console.log(data))
//         }
//     }

//     const removeFromCart = (itemId) => {
//         setCartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}))
//         if(localStorage.getItem('auth-token')){
//             fetch('http://localhost:4000/removefromcart',{
//                 method:'POST',
//                 headers:{
//                     Accept:'application/form-data',
//                     'auth-token':`${localStorage.getItem('auth-token')}`,
//                     'Content-Type':'application/json',
//                 },
//                 body:JSON.stringify({"itemId":itemId}),
//             })
//             .then((response) => response.json())
//             .then((data) => console.log(data))
//         }
//     }

//     const getTotalCartAmount = () => {
//         let totalAmount = 0;
//         for(const item in cartItems)
//         {
//             if(cartItems[item] > 0)
//             {
//                 let itemInfo = all_product.find((product) => product.id === Number(item));
//                 totalAmount += itemInfo.new_price * cartItems[item];
//             }
//         } 
//         return totalAmount;
//     }

//     const getTotalCartItems = () => {
//         let totalItem = 0;
//         for(const item in cartItems)
//         {
//             if(cartItems[item] > 0)
//             {
//                 totalItem += cartItems[item];
//             }
//         }
//         return totalItem;
//     }
//     const contextValue = {all_product,cartItems,addToCart,removeFromCart, getTotalCartAmount, getTotalCartItems};

//     return (
//         <ShopContext.Provider value={contextValue}>
//             {props.children}
//         </ShopContext.Provider>
//     )
// }

// export default ShopContextProvider;

import React, { createContext, useEffect, useState } from "react";
import { fetchCart, addToCartAPI, removeFromCartAPI, fetchAllProducts } from '../api/apiServices';  // Import API functions


export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [all_product, setAll_Product] = useState([]);

    // Fetch products and cart data from API
    useEffect(() => {
        // Fetch all products
        fetchAllProducts()
            .then((data) => setAll_Product(data))
            .catch((error) => console.error("Error fetching products:", error));

        // Fetch cart data if user is logged in
        if (localStorage.getItem('auth-token')) {
            fetchCart(localStorage.getItem('auth-token'))
                .then((data) => setCartItems(data))
                .catch((error) => console.error("Error fetching cart:", error));
        }
    }, []);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        
        if (localStorage.getItem('auth-token')) {
            addToCartAPI(localStorage.getItem('auth-token'), itemId)
                .then((data) => console.log(data))
                .catch((error) => console.error("Error adding to cart:", error));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        if (localStorage.getItem('auth-token')) {
            removeFromCartAPI(localStorage.getItem('auth-token'), itemId)
                .then((data) => console.log(data))
                .catch((error) => console.error("Error removing from cart:", error));
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = { all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
