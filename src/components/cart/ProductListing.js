import React, {Fragment} from 'react';

import Product from "./productListing/Product";

const ProductListing = props => {
    const {setIsCartUpdating, items} = props;

    if (items.length > 0) {
        const productComponents = items.map(product => (
            <Product
                item={product}
                key={product.productId}
                setIsCartUpdating={setIsCartUpdating}
            />
        ));

        return (
            <Fragment>
                {/* TODO: translations */}
                <div className="productListingRoot">
                    <h2>Tuotteet:</h2>
                </div>
                <ul>{productComponents}</ul>
            </Fragment>
        );
    }

    return null;
}

// TODO: prop types

export default ProductListing;