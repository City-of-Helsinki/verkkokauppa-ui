import { cartApiUrl } from "../constants";

export const createCart = async (client, namespace, user) => {
  const queryBodyStr = JSON.stringify({ namespace, user });
  return await client.post(cartApiUrl, queryBodyStr);
};

export const addItemToCart = async (client, cartId, payload) => {
  const queryBodyStr = JSON.stringify(payload);
  return await client.post(`${cartApiUrl}${cartId}/items`, queryBodyStr);
};

export const fetchCart = async (client, cartId) => {
  return await client.get(`${cartApiUrl}${cartId}/totals`);
};

export const updateItem = async (client, cartId, productId, payload) => {
  const queryBodyStr = JSON.stringify(payload);
  // noinspection ES6RedundantAwait
  return await client.put(
    `${cartApiUrl}${cartId}/items/${productId}`,
    queryBodyStr
  );
};

export const removeItemFromCart = async (client, cartId, productId) => {
  return await client.delete(
    `${cartApiUrl}${cartId}/items/${productId}` + productId
  );
};
