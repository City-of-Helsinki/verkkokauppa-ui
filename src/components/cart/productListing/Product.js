import React from 'react';
import {func, number, shape, string} from "prop-types";
import {IconTrash, Button} from "hds-react";

import Price from "./product/Price";
import NumberInput from "./product/NumberInput";
import {useProduct} from "../../../talons/cart/productListing/useProduct";

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

    // TODO: better looking/styled item error message
    return (
        <li>
            <span className="itemErrorText">{errorMessage}</span>
            <div className="item">
                <div>
                    {quantity + ' x ' + productId}
                    <Price value={rowTotal.grossValue}/>{/* TODO: currency code? */}
                </div>
                <div className="itemQuantity">
                    <NumberInput
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
                        onClick={handleRemoveFromCart}>
                        Poista
                    </Button>
                </div>
            </div>
        </li>
    );
}

Product.propTypes = {
    setIsCartUpdating: func,
    item: shape({
        productId: number,
        unit: string,
        rowTotal: shape({
            grossValue: number
        })
    })
}

export default Product;