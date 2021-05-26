import {
    createCart as createCartService,
    fetchCart,
    addItemToCart as addItemToCartService,
    updateItem,
    removeItemFromCart as removeItemFromCartService
} from '../../services/cart';
import {
    getCartRequest,
    getCartReceiveSuccess,
    getCartReceiveError,
    getDetailsRequest,
    getDetailsReceiveSuccess,
    getDetailsReceiveError,
    addItemRequest,
    addItemReceiveSuccess,
    addItemReceiveError,
    updateItemRequest,
    updateItemReceiveSuccess,
    updateItemReceiveError,
    removeItemRequest,
    removeItemReceiveSuccess,
    removeItemReceiveError,
    cartReset
} from './actions';

export const createCart = (payload = {}) => {
    const {
        client,
        namespace,
        user,
    } = payload;

    return async function thunk(dispatch, getState) {
        const {cart} = getState();
        if (cart.cartId) {
            return;
        }

        dispatch(getCartRequest());

        // TODO: try to get cart from local/session storage here?

        try {
            const {data} = await createCartService(client, namespace, user);

            // TODO: save cart id to local/session storage here?

            dispatch(getCartReceiveSuccess(data.cartId));
        } catch (error) {
            dispatch(getCartReceiveError(error));
            throw new Error('Unable to create cart');
        }
    };
};

export const addItemToCart = (payload = {}) => {
    const {
        client,
        productId,
        quantity,
    } = payload;

    return async function thunk(dispatch, getState) {
        dispatch(addItemRequest());

        const {cart} = getState();
        const {cartId} = cart;

        try {
            const variables = {
                productId,
                quantity
            };

            await addItemToCartService(client, cartId, variables);

            await dispatch(
                getCartDetails({client})
            );
            dispatch(addItemReceiveSuccess());
        } catch (error) {
            dispatch(addItemReceiveError(error));
        }
    };
};

export const updateItemInCart = (payload = {}) => {
    const {
        client,
        productId,
        quantity,
    } = payload;

    return async function thunk(dispatch, getState) {
        dispatch(updateItemRequest());

        const {cart} = getState();
        const {cartId} = cart;

        try {
            const variables = {
                quantity
            };

            await updateItem(client, cartId, productId, variables);

            await dispatch(
                getCartDetails({client})
            );

            dispatch(updateItemReceiveSuccess());
        } catch (error) {
            dispatch(updateItemReceiveError(error));
        }
    };
};

export const removeItemFromCart = payload => {
    const {
        client,
        productId
    } = payload;

    return async function thunk(dispatch, getState) {
        dispatch(removeItemRequest());

        const {cart} = getState();
        const {cartId} = cart;

        try {
            await removeItemFromCartService(client, cartId, productId);

            dispatch(removeItemReceiveSuccess());
        } catch (error) {
            dispatch(removeItemReceiveError(error));
        }

        await dispatch(
            getCartDetails({client})
        );
    };
};

export const getCartDetails = payload => {
    const {client} = payload;

    return async function thunk(dispatch, getState) {
        const {cart} = getState();

        // TODO: hardcoded only for testing!
        //const {cartId} = cart;
        const cartId = '61e3e395-104d-3aea-966c-0dd5dc059e37';

        if (!cartId) {
            return;
        }

        dispatch(getDetailsRequest());

        try {
            const {data} = await fetchCart(client, cartId);
            dispatch(getDetailsReceiveSuccess(data));
        } catch (error) {
            dispatch(getDetailsReceiveError(error));
        }
    };
};

export const removeCart = () =>
    async function thunk(dispatch) {
        // TODO: clear the cartId from local storage!
        dispatch(cartReset);
    };
