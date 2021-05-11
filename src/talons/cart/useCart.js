import {useEffect, useState, useMemo} from "react";
import {cartApiUrl} from "../../contants";
import { useCartContext} from "../../context/cart";

export const useCart = props => {
    const [fetchCartError, setFetchCartError] = useState(false);
    const [cartData, setCartData] = useState(null);
    const [fetchCartLoading, setFetchCartLoading] = useState(false);
    const [isCartUpdating, setIsCartUpdating] = useState(false);

    const [{ cartId }] = useCartContext();

    const fetchCart = (cartId) => {
        /*const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        };
        console.log(requestOptions);

        setFetchCartLoading(true);

        fetch(cartApiUrl + cartId + '/totals')
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then(function (response) {
                setCartData(response.json());
            })
            .catch(_ => {
                setFetchCartError(true);
            });*/
        setCartData(JSON.parse('{"cartId":"c2ddaedb-b204-30e1-ae13-bef19f210238","namespace":"asukaspysakointi","user":"Testihenkilo","createdAt":"2021-05-07","items":[{"cartItemId":"2ffcf5c7-4986-3074-8350-947e83870a71","cartId":"c2ddaedb-b204-30e1-ae13-bef19f210238","productId":"7a691d19-df05-3bec-a786-fd3b9e991a2d","quantity":1,"unit":"pcs","rowTotal":{"netValue":200,"grossValue":248,"vatValue":48},"unitPrice":{"netValue":200,"grossValue":248,"vatValue":48,"vatPercentage":24}},{"cartItemId":"774c0dd8-05f1-3aef-80b1-7e2e005e31c7","cartId":"c2ddaedb-b204-30e1-ae13-bef19f210238","productId":"97249ce6-b8ac-3b19-b81a-c026c4f0488b","quantity":1,"unit":"pcs","rowTotal":{"netValue":100,"grossValue":124,"vatValue":24},"unitPrice":{"netValue":100,"grossValue":124,"vatValue":24,"vatPercentage":24}}],"cartTotals":{"cartId":"c2ddaedb-b204-30e1-ae13-bef19f210238","netValue":300,"grossValue":372,"vatValue":72,"rowTotals":[{"cartItemId":"2ffcf5c7-4986-3074-8350-947e83870a71","netValue":200,"grossValue":248,"vatValue":48,"vatPercentage":24},{"cartItemId":"774c0dd8-05f1-3aef-80b1-7e2e005e31c7","netValue":100,"grossValue":124,"vatValue":24,"vatPercentage":24}]}}'));
    }

    useEffect(() => {
        fetchCart(cartId);
    }, [cartId])

    useEffect(() => {
        // Let the cart page know it is updating while we're waiting on network data.
        setIsCartUpdating(fetchCartLoading);
    }, [fetchCartLoading]);

    const hasItems = !!(cartData && cartData.items != null && cartData.items.length > 0);
    const shouldShowLoadingIndicator = fetchCartLoading && !fetchCartError && !hasItems;

    const cartItems = useMemo(() => {
        return (cartData && cartData.items) || [];
    }, [cartData]);

    // TODO: ok?
    const totals = useMemo(() => {
        return (cartData && cartData.cartTotals) || null;
    }, [cartData]);

    return {
        cartItems,
        totals,
        hasItems,
        isCartUpdating,
        setIsCartUpdating,
        shouldShowLoadingIndicator
    };
};