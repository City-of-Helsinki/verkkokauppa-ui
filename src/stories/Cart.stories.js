// Cart.stories.js

import React from 'react';

import { Cart } from './Cart';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Demo/Cart',
  component: Cart,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Cart {...args} />;

export const BrowseCart = Template.bind({});
BrowseCart.args = {
  //primary: true,
  //label: 'Button',
  //json: '{"1": "ProductA", "2": "ProductB", "3": "ProductC"}',
};
