import {useCallback, useEffect, useMemo, useState} from 'react';

import {useCartContext} from "../../../context/CartContext";
import {useApiContext} from "../../../context/ApiContext";

export const useProduct = props => {
    const {
        item,
        setIsCartUpdating
    } = props;

    const [cartState, cartApi] = useCartContext();
    const {client} = useApiContext();
    const [displayError, setDisplayError] = useState(false);

    const {isUpdatingItem, isRemovingItem, removeItemError, updateItemError} = cartState;

    useEffect(() => {
        setIsCartUpdating(isUpdatingItem || isRemovingItem);

        return () => setIsCartUpdating(false);
    }, [
        isRemovingItem,
        setIsCartUpdating,
        isUpdatingItem
    ]);

    // TODO: translations
    const derivedErrorMessage = useMemo(() => {
        if (removeItemError) {
            return 'Tuotteen poisto ostoskorista epäonnistui. Yritä myöhemmin uudelleen';
        } else if(updateItemError) {
            return 'Tuotteen päivitys ostoskorissa epäonnistui. Yritä myöhemmin uudelleen';
        } else {
            return '';
        }

    }, [displayError, removeItemError, updateItemError]);

    const handleRemoveFromCart = useCallback(() => {
        try {
            cartApi.removeItemFromCart({client, productId: item.productId});
        } catch (err) {
            setDisplayError(true);
        }
    }, [client, cartApi, item.productId]);

    const handleUpdateItemQuantity = useCallback(
        async quantity => {
            try {
                cartApi.updateItemInCart({client, productId: item.productId, quantity});
            } catch (err) {
                setDisplayError(true);
            }
        },
        [client, cartApi, item.productId]
    );

    return {
        errorMessage: derivedErrorMessage,
        handleRemoveFromCart,
        handleUpdateItemQuantity,
        product: item
    };
};