import {useCallback, useEffect, useMemo, useState} from 'react';

import {cartApiUrl} from "../../../contants";
import {useCartContext} from "../../../context/cart";
import {deriveErrorMessage} from "../../../utils/cart/productListing/product";

export const useProduct = props => {
    const {
        item,
        setIsCartUpdating
    } = props;

    const [{ cartId }] = useCartContext();

    const [removeItemError, setRemoveItemError] = useState(null);
    const [removeItemLoading, setRemoveItemLoading] = useState(false);
    const [removeItemCalled, setRemoveItemCalled] = useState(false);
    const [updateError, setUpdateError] = useState(null);
    const [updateItemLoading, setUpdateItemLoading] = useState(false);
    const [updateItemCalled, setUpdateItemCalled] = useState(false);

    const [displayError, setDisplayError] = useState(false);

    const removeItem = (cartId, itemId) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        };

        setRemoveItemLoading(true);
        setRemoveItemCalled(true);

        fetch(
            cartApiUrl + cartId + '/items/' + itemId,
            requestOptions
        )
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                setRemoveItemLoading(false);
                setRemoveItemCalled(false);
                setRemoveItemError(false);
            })
            .catch(error => {
                setRemoveItemLoading(false);
                setRemoveItemCalled(false);
                setRemoveItemError(error.toString()) // TODO: ei näin
            });
    }

    const updateItemQuantity = (cartId, itemId, quantity) => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: {
                raw: { quantity: quantity }
            }
        };

        setUpdateItemLoading(true);
        setUpdateItemCalled(true);

        fetch(
            cartApiUrl + cartId + '/items/' + itemId,
            requestOptions
        )
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                setUpdateItemLoading(false);
                setUpdateItemCalled(false);
                setUpdateError(false);
            })
            .catch(error => {
                setUpdateItemLoading(false);
                setUpdateItemCalled(false);
                setUpdateError(error.toString()) // TODO: ei näin
            });
    }

    useEffect(() => {
        if (updateItemCalled || removeItemCalled) {
            setIsCartUpdating(updateItemLoading || removeItemLoading);
        }

        return () => setIsCartUpdating(false);
    }, [
        removeItemCalled,
        removeItemLoading,
        setIsCartUpdating,
        updateItemCalled,
        updateItemLoading
    ]);

    const derivedErrorMessage = useMemo(() => {
        return (
            (displayError &&
                deriveErrorMessage([updateError, removeItemError])) ||
            ''
        );
    }, [displayError, removeItemError, updateError]);

    const handleRemoveFromCart = useCallback(() => {
        try {
            removeItem(cartId, item.productId);
        } catch (err) {
            setDisplayError(true);
        }
    }, [cartId, item.productId, removeItem]);

    const handleUpdateItemQuantity = useCallback(
        async quantity => {
            try {
                updateItemQuantity(cartId, item.productId, quantity);
            } catch (err) {
                setDisplayError(true);
            }
        },
        [cartId, item.productId, updateItemQuantity]
    );

    return {
        errorMessage: derivedErrorMessage,
        handleRemoveFromCart,
        handleUpdateItemQuantity,
        product: item
    };
};