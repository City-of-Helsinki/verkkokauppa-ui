import React, {Fragment} from "react";
import PropTypes from 'prop-types';
import {Notification, Button} from "hds-react";
import styles from "hds-react";

import ProductListing from './cart/ProductListing';
import {useCart} from '../talons/cart/useCart';
import PriceSummary from "./cart/PriceSummary";
import LoadingIndicator from "./LoadingIndicator";
import {useCartContext} from "../context/cart";
import './cart/cart.css';

export const Cart = props => {
    const {
        handleGoBack = () => {},
        handleProceedToCheckout = () => {}
    } = props;

    const [{cartId}] = useCartContext();
    const {
        cartItems,
        totals,
        hasItems,
        isCartUpdating,
        setIsCartUpdating,
        shouldShowLoadingIndicator
    } = useCart();

    if (shouldShowLoadingIndicator) {
        return <LoadingIndicator />
    }
    if (!cartId) { // TODO: translations (or maybe just remove completely)
        return <Notification label="Virhetilanne" type="error">Ostoskorin haku ei onnistunut!</Notification>;
    }

    if (!hasItems) {
        return (
            <Fragment>
                <h3>Ostoskorisi on tällä hetkellä tyhjä{/* TODO: translations*/ }</h3>
                <Button
                    variant="supplementary"
                    onClick={handleGoBack}>
                    Jatka ostoksia
                </Button>
            </Fragment>
        );
    }

    const priceSummary = hasItems ? (
        <PriceSummary totals={totals} isUpdating={isCartUpdating} />
    ) : null;

    // TODO: display sign in if not signed in?

    return (
        <article>
            {/* TODO: translations */}
            <div className="cartBody">
                <h1>Ostoskori</h1>
                <span>Täällä voit tarkastella ostoskorin sisältöä ja tehdä siihen muutoksia.</span>
                <section>
                    <ProductListing
                        items={cartItems}
                        setIsCartUpdating={setIsCartUpdating} />
                    <hr/>
                    <div>{priceSummary}</div>
                </section>
            </div>
            <div>
                <Button
                    disabled={isCartUpdating}
                    onClick={handleProceedToCheckout}>
                    Tilaa tuotteet
                </Button><br />
                <Button
                    variant="supplementary"
                    onClick={handleGoBack}>
                    Jatka ostoksia
                </Button>
            </div>
        </article>
    );
};

// TODO: remove
Cart.propTypes = {
    userId: PropTypes.string,
};

Cart.defaultProps = {
    userId: 'Testihenkilo'
};
