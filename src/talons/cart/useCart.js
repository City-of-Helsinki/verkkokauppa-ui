import {useEffect, useState, useMemo} from "react";
import {useCartContext} from "../../context/CartContext";
import {useApiContext} from "../../context/ApiContext";

export const useCart = props => {
    const [isCartUpdating, setIsCartUpdating] = useState(false);
    const [cartState, cartApi] = useCartContext();
    const {client} = useApiContext();

    const {cartId} = cartState;
    const fetchCartLoading = cartState.isLoading;
    const data = cartState;

    useEffect(() => {
        // Skip if there is no cart id yet
        if(cartId) {
            cartApi.getCartDetails({client});
        }
    }, [client, cartId, cartApi])

    useEffect(() => {
        // Let the cart page know it is updating while we're waiting on network data.
        setIsCartUpdating(fetchCartLoading);
    }, [fetchCartLoading]);

    const hasItems = !!(data && data.items != null && data.items.length > 0);
    const shouldShowLoadingIndicator = fetchCartLoading && !data;

    const cartItems = useMemo(() => {
        return (data && data.items) || [];
    }, [data]);

    const totals = useMemo(() => {
        // noinspection JSUnresolvedVariable
        return (data && data.cartTotals) || null;
    }, [data]);


    return {
        cartItems,
        totals,
        hasItems,
        isCartUpdating,
        setIsCartUpdating,
        shouldShowLoadingIndicator
    };
};