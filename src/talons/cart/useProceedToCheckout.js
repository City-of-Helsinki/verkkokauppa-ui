import { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useCartContext } from "../../context/CartContext";
import { usePost } from "../../hooks/usePost";
import { orderApiUrl } from "../../constants";

export const useProceedToCheckout = (props) => {
  const [{ cartId }] = useCartContext();
  const history = useHistory();

  const { data, error, loading, postData: createOrder } = usePost(
    `${orderApiUrl}/convert/${cartId}`
  );

  const handleProceedToCheckout = useCallback(() => {
    if (!cartId) {
      return;
    }

    // TODO: only for testing! Get from user context?
    const payload = {
      customer: {
        name: "Customer Name",
        email: "customerEmail@hel.dev",
      },
    };
    createOrder(payload);
  }, [cartId, data, loading, error, createOrder]);

  // noinspection JSUnresolvedVariable
  const checkoutUrl = data && data.checkoutUrl ? data.checkoutUrl : null;

  useEffect(() => {
    if (!loading && !error && checkoutUrl) {
      const parts = checkoutUrl.split("orderId=");
      if (parts.length < 2) {
        console.error("Invalid checkout url received. Could not proceed.");
        return;
      }
      window.location.href = checkoutUrl;

      const orderId = parts[1];
      history.push("/checkout/" + orderId);
    }
  }, [history, loading, error, checkoutUrl]);

  return {
    handleProceedToCheckout,
  };
};
