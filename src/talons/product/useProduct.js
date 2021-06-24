import { useEffect, useMemo, useCallback } from "react";

import { productApiUrl, cartApiUrl } from "../../constants";
import { useCartContext } from "../../context/CartContext";
import { usePost } from "../../hooks/usePost";
import { useFetch } from "../../hooks/useFetch";

export const useProduct = (productId) => {
  const [{ cartId }] = useCartContext();

  const {
    postData: addSimpleProductToCart,
    error: errorAddingSimpleProduct,
    loading: isAddSimpleLoading,
  } = usePost(cartApiUrl + cartId + "/items");

  const {
    error: errorLoadingProduct,
    loading: loadingProduct,
    data,
    fetchData: fetchProduct,
  } = useFetch(productApiUrl + productId);

  const product = useMemo(() => {
    if (!data) {
      return null;
    }
    return data;
  }, [data]);

  const handleAddToCart = useCallback(async () => {
    const payload = {
      productId,
      quantity: 1,
    };

    try {
      await addSimpleProductToCart(payload);
    } catch (error) {
      console.error("Cannot add to cart. Error: " + error.toString());
    }
  }, [addSimpleProductToCart, cartId, productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    errorLoadingProduct,
    loadingProduct,
    errorAddingSimpleProduct,
    handleAddToCart,
    isAddToCartDisabled: isAddSimpleLoading,
    product,
  };
};
