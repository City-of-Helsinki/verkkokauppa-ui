import React, {createContext, useContext, useEffect, useMemo} from 'react';
import {connect} from 'react-redux';

import {
    createCart,
    getCartDetails,
    addItemToCart,
    updateItemInCart,
    removeItemFromCart
} from '../modules/cart/asyncActions';
import {useApiContext} from "./ApiContext";

// noinspection JSCheckFunctionSignatures
const CartContext = createContext();

const CartContextProvider = props => {
    const {
        createCart,
        getCartDetails,
        addItemToCart,
        updateItemInCart,
        removeItemFromCart,
        cartState,
        children
    } = props;
    const {getClient} = useApiContext();

    const client = getClient();

    const derivedCartState = {
        ...cartState,
    };

    const cartApi = useMemo(
        () => ({
            createCart,
            getCartDetails,
            addItemToCart,
            updateItemInCart,
            removeItemFromCart
        }),
        [
            createCart,
            getCartDetails,
            addItemToCart,
            updateItemInCart,
            removeItemFromCart
        ]
    );

    const contextValue = useMemo(() => [derivedCartState, cartApi], [
        cartApi,
        derivedCartState
    ]);

    // TODO: check user is authed!

    useEffect(() => {
        // TODO: only for testing!
        cartApi.createCart({client, namespace: 'asukaspysakointi', user: 'test'});
    }, [client, cartApi]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

const mapStateToProps = ({ cart }) => ({ cartState: cart });

const mapDispatchToProps = {
    createCart,
    getCartDetails,
    addItemToCart,
    updateItemInCart,
    removeItemFromCart
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartContextProvider);

export const useCartContext = () => useContext(CartContext);
