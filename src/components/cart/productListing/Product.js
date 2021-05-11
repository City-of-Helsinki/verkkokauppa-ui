import React from 'react';
import {IconTrash, Button, NumberInput} from "hds-react";

import Price from "./product/Price";
import {useProduct} from "../../../talons/cart/productListing/useProduct";
import Quantity from "./product/Quantity";

const Product = props => {
    const {item, setIsCartUpdating} = props;

    const {
        errorMessage,
        handleRemoveFromCart,
        handleUpdateItemQuantity
    } = useProduct({
        item,
        setIsCartUpdating
    });

    const {
        productId,
        unit,
        rowTotal
    } = item;
    const quantity = parseInt(item.quantity);

    return (
        <li>
            <span className="itemErrorText">{errorMessage}</span>
            <div className="item">
                <div>
                    {quantity + ' x ' + productId}
                    <Price value={rowTotal.grossValue}/>{/* TODO: currency code? */}
                </div>
                <div className="itemQuantity">
                    <Quantity
                        helperText="Seliteteksti"
                        initialValue={quantity}
                        onChange={handleUpdateItemQuantity}
                    />
                </div>
                <div>
                    {/* TODO: translations */}
                    <Button
                        variant="supplementary"
                        iconLeft={<IconTrash />}
                        onClick={handleRemoveFromCart}
                    >
                        Poista
                    </Button>
                </div>
            </div>
        </li>
    );
}

// TODO: prop types

export default Product;