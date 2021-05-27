import React, {Fragment} from "react";
import {func} from "prop-types";
import {Button} from "hds-react";

import ProductListing from './cart/ProductListing';
import PriceSummary from "./cart/PriceSummary";
import LoadingIndicator from "./LoadingIndicator";
import {useCart} from '../talons/cart/useCart';
import {useProceedToCheckout} from "../talons/cart/useProceedToCheckout";
import './cart/cart.css';

const Cart = props => {
    const {
        handleGoBack = () => {}
    } = props;

    const {
        cartItems,
        totals,
        hasItems,
        isCartUpdating,
        setIsCartUpdating,
        shouldShowLoadingIndicator
    } = useCart();

    const {handleProceedToCheckout} = useProceedToCheckout();

    if (shouldShowLoadingIndicator) {
        return <LoadingIndicator />
    }

    // TODO: translations
    if (!hasItems) {
        return (
            <Fragment>
                <h3>Ostoskorisi on tällä hetkellä tyhjä</h3>
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

Cart.propTypes = {
    handleGoBack: func
};

export default Cart;