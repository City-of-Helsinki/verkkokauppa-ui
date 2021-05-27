import {
    ADD_ITEM,
    GET_CART,
    GET_DETAILS,
    REMOVE_ITEM,
    UPDATE_ITEM
} from './types';

export const initialState = {
    cartId: null,
    items: {},
    cartTotals: {},
    isLoading: false,
    isAddingItem: false,
    isUpdatingItem: false,
    isRemovingItem: false,
    detailsError: null,
    getCartError: null,
    addItemError: null,
    removeItemError: null,
    updateItemError: null
};

const cartReducer = (state = initialState, {type, payload = {}, error = null}) => {
    switch (type) {
        case GET_CART.RECEIVE:
            if (error) {
                return {
                    ...initialState,
                    getCartError: error
                };
            }

            return {
                ...state,
                cartId: String(payload),
                getCartError: null
            };
        case GET_DETAILS.REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case GET_DETAILS.RECEIVE:
            if (error) {
                return {
                    ...state,
                    detailsError: error,
                    isLoading: false
                };
            }

            return {
                ...state,
                ...payload,
                isLoading: false
            };
        case ADD_ITEM.REQUEST:
            return {
                ...state,
                isAddingItem: true
            };
        case ADD_ITEM.RECEIVE:
            if (error) {
                return {
                    ...state,
                    addItemError: error,
                    isAddingItem: false
                };
            }

            return {
                ...state,
                isAddingItem: false
            };
        case UPDATE_ITEM.REQUEST:
            return {
                ...state,
                isUpdatingItem: true
            };
        case UPDATE_ITEM.RECEIVE:
            if (error) {
                return {
                    ...state,
                    isUpdatingItem: false,
                    updateItemError: error
                };
            }

            return {
                ...state,
                isUpdatingItem: false
            };
        case REMOVE_ITEM.REQUEST:
            return {
                ...state,
                isRemovingItem: true
            };
        case REMOVE_ITEM.RECEIVE:
            if (error) {
                return {
                    ...state,
                    isRemovingItem: false,
                    removeItemError: error
                };
            }
            return {
                ...state,
                isRemovingItem: false
            };
        default:
            return state;
    }
};

export default cartReducer;