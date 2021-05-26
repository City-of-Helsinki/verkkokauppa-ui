// Product.stories.js

import React from 'react';
import {Provider} from 'react-redux';

import {Product} from './product/Product';
import ApiContextProvider from "../context/ApiContext";
import client, {getClient} from "../rest/fetch";
import CartContextProvider from "../context/CartContext";
import configureStore from "../store";

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Demo/Product Card',
    component: Product,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => {
    const reduxStore = configureStore();

    return (
        <Provider store={reduxStore}>
            <ApiContextProvider client={client} getClient={getClient}>
                <CartContextProvider>
                    <Product {...args} />
                </CartContextProvider>
            </ApiContextProvider>
        </Provider>
    );
};

export const AddProductToCart = Template.bind({});
AddProductToCart.args = {
    //primary: true,
    //label: 'Button',
    //json: '{"1": "ProductA", "2": "ProductB", "3": "ProductC"}',
};
