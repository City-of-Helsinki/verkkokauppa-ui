// Cart.stories.js

import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Cart from '../components/Cart';
import CartContextProvider from "../context/CartContext";
import ApiContextProvider from "../context/ApiContext";
import client, {getClient} from '../rest/fetch';
import configureStore from '../store'
import Checkout from "../components/Checkout";

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Demo/Cart',
    component: Cart,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => {
    const reduxStore = configureStore();

    return (
        <Provider store={reduxStore}>
            <ApiContextProvider client={client} getClient={getClient}>
                <CartContextProvider>
                    <Router>
                        <Switch>
                            <Route path="/checkout/:slug">
                                <Checkout />
                            </Route>
                            <Route path="*">
                                <Cart {...args}/>
                            </Route>
                        </Switch>
                    </Router>
                </CartContextProvider>
            </ApiContextProvider>
        </Provider>
    );
}

export const BrowseCart = Template.bind({});
BrowseCart.args = {
    //primary: true,
    //label: 'Button',
    //json: '{"1": "ProductA", "2": "ProductB", "3": "ProductC"}',
};
