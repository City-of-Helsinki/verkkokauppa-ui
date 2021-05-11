import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';

const CartContext = createContext();

/*const isCartEmpty = cart =>
    !cart || !cart.details.items || cart.details.items.length === 0;

const getTotalQuantity = items =>
    items.reduce((total, item) => total + item.quantity, 0);*/

const CartContextProvider = props => {
    const { children } = props;

    const [cartId, setCartId] = useState(); // TODO: refactor to redux store

    const derivedCartState = {
        cartId: "c2ddaedb-b204-30e1-ae13-bef19f210238"
    };

    const contextValue = useMemo(() => [derivedCartState], [
        derivedCartState
    ]);

    /*const createCart = () => {
        let randonUser = Math.random().toString(36).substring(7);

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({namespace: "asukaspysakointi", user: userId})
        };

        fetch(cartApiUrl, requestOptions)
            .then(function (response) {
                console.log(response)
                return response.json();
            })
            .then(function (myJson) {
                setCartId(myJson.cartId);
            });

    }*/


    // Initializes the cart if there isn't one
    useEffect(() => {
        //createCart();
    }, []);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};


export default CartContextProvider;

export const useCartContext = () => useContext(CartContext);
