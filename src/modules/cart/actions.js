import {
    ADD_ITEM,
    GET_CART,
    GET_DETAILS,
    REMOVE_ITEM,
    UPDATE_ITEM,
    RESET
} from './types';

export const getCartRequest = () => ({
    type: GET_CART.REQUEST
});

export const getCartReceiveSuccess = (payload) => ({
    type: GET_CART.RECEIVE,
    payload: payload
});

export const getCartReceiveError = (error) => ({
    type: GET_CART.RECEIVE,
    error: error
});

export const getDetailsRequest = () => ({
    type: GET_DETAILS.REQUEST,
});

export const getDetailsReceiveSuccess = (payload) => ({
    type: GET_DETAILS.RECEIVE,
    payload: payload
});

export const getDetailsReceiveError = (error) => ({
    type: GET_DETAILS.RECEIVE,
    error: error
});

export const addItemRequest = () => ({
    type: ADD_ITEM.REQUEST,
});

export const addItemReceiveSuccess = () => ({
    type: ADD_ITEM.RECEIVE
});

export const addItemReceiveError = (error) => ({
    type: ADD_ITEM.RECEIVE,
    error: error
});

export const updateItemRequest = () => ({
    type: UPDATE_ITEM.REQUEST,
});

export const updateItemReceiveSuccess = () => ({
    type: UPDATE_ITEM.RECEIVE
});

export const updateItemReceiveError = (error) => ({
    type: UPDATE_ITEM.RECEIVE,
    error: error
});

export const removeItemRequest = () => ({
    type: REMOVE_ITEM.REQUEST,
});

export const removeItemReceiveSuccess = () => ({
    type: REMOVE_ITEM.RECEIVE
});

export const removeItemReceiveError = (error) => ({
    type: REMOVE_ITEM.RECEIVE,
    error: error
});

export const cartReset = () => ({
    type: RESET
});