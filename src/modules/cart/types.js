const prefix = 'CART';

export const ADD_ITEM = {
    REQUEST: prefix + '/ADD_ITEM_REQUEST',
    RECEIVE: prefix + '/ADD_ITEM_RECEIVE',
};
export const GET_CART = {
    REQUEST: prefix + '/GET_CART_REQUEST',
    RECEIVE: prefix + '/GET_CART_RECEIVE',
};
export const GET_DETAILS = {
    REQUEST: prefix + '/GET_DETAILS_REQUEST',
    RECEIVE: prefix + '/GET_DETAILS_RECEIVE',
};
export const REMOVE_ITEM = {
    REQUEST: prefix + '/REMOVE_ITEM_REQUEST',
    RECEIVE: prefix + '/REMOVE_ITEM_RECEIVE',
};
export const UPDATE_ITEM = {
    REQUEST: prefix + '/UPDATE_ITEM_REQUEST',
    RECEIVE: prefix + '/UPDATE_ITEM_RECEIVE',
};

export const RESET = prefix + '/RESET';