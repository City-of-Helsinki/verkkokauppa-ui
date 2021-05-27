import React from "react";
import PropTypes from 'prop-types';
import {Button, Card, Navigation} from "hds-react";

import fullPageLoadingIndicator from '../../components/loadingIndicator/static';
import {useProduct} from "../../talons/product/useProduct";
import './product.css';

export const Product = ({productId}) => {
    const {
        errorLoadingProduct,
        loadingProduct,
        errorAddingSimpleProduct,
        handleAddToCart,
        isAddToCartDisabled,
        product
    } = useProduct(productId);

    // TODO: translations!
    if (loadingProduct && !product) return fullPageLoadingIndicator;
    if (errorLoadingProduct && !product)
        return (
            <p>Tuotteiden haku ei onnistunut!</p>
        );

    if (!product) {
        return (
            <h1>Tuotteella ei ole varastosaldoa. Yritä myöhemmin uudestaan.</h1>
        );
    }

    // TODO: don't display like this...
    if (errorAddingSimpleProduct) {
        return <p>Tuotteen lisääminen ostoskoriin epäonnistui.</p>
    }

    return (
        <article>
            <Navigation
                title="Helshop Demo"
                menuToggleAriaLabel="menu"
                skipTo="#content"
                skipToContentLabel="Skip to content"
            >
                <Navigation.Actions>
                    <a href="/?path=/story/demo-cart--browse-cart">
                        <div className="cartStatus">Ostoskori</div>
                    </a>
                </Navigation.Actions>
            </Navigation>
            <div className="container">
                <section className="productList">
                    <Card
                        border
                        heading={product.name}
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    >
                        <Button
                            disabled={isAddToCartDisabled}
                            onClick={handleAddToCart}>
                            Lisää ostoskoriin
                        </Button>
                        <div className="clear"/>
                    </Card>
                </section>
            </div>
        </article>

    );
};

Product.propTypes = {
    productId: PropTypes.string.isRequired,
};

Product.defaultProps = {
    productId: '97249ce6-b8ac-3b19-b81a-c026c4f0488b',
};