import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import { Footer, Tooltip, Card, Navigation, Container, Button,Notification } from "hds-react";

import './cart.css';
import styles from "hds-react";

export const Cart = ({ cartApiUrl, productId, userId, ...props }) => {

    const [notification, setNotification] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [cartId, setCartId] = useState();
    const [cartItems, setCartItems] = useState();

    const [cartTotalsGross,setCartTotalsGross]=useState(0);
    const [cartTotalsNet,setCartTotalsNet]=useState(0);
    const [cartTotalsVat,setCartTotalsVat]=useState(0);

    const createCart=() => {

        let randonUser = Math.random().toString(36).substring(7);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({namespace: "asukaspysakointi", user: userId})
        };

        fetch(cartApiUrl, requestOptions)
            .then(function(response){
                console.log(response)
                return response.json();
            })
            .then(function(myJson) {
                console.log(myJson);
                setCartId(myJson.cartId);
                fetchCart(myJson.cartId);
            });

    }

    const fetchCart=(cartId) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(cartApiUrl+cartId+'/totals')
            .then(function(response){
                console.log(response)
                return response.json();
            })
            .then(function(myJson) {
                if (myJson.items != null && myJson.items.length > 0) {
                    setCartId(myJson.cartId);
                    setCartCount(myJson.items.length);

                    var cartRows;
                    {myJson.items.map((key, index) => (
                        cartRows = <tr><td>{key.productId}</td><td>{key.quantity}</td><td>{key.rowTotal.grossValue}&euro;</td><td>{key.rowTotal.vatValue}&euro;</td><td>{key.rowTotal.netValue}&euro;</td></tr>

                    ))}

                    console.log(cartRows)
                    setCartItems(
                        cartRows
                    )

                    setCartTotalsGross(myJson.cartTotals.grossValue);
                    setCartTotalsNet(myJson.cartTotals.netValue);
                    setCartTotalsVat(myJson.cartTotals.vatValue);

                    console.log(myJson);
                }                
                
            });

        console.log(requestOptions);
    }

    useEffect(()=>{
        createCart();
        //fetchCart()
    },[])


    return (
        <article>
            <Navigation
            title="Helshop Demo"
            menuToggleAriaLabel="menu"
            skipTo="#content"
            skipToContentLabel="Skip to content"
            >    
                <Navigation.Actions>
                    <a href="/?path=/story/demo-cart--browse-cart"><div className="cartStatus">Ostoskori<div className="cartCount">{cartCount}</div></div></a>
                </Navigation.Actions>
            </Navigation>
            <div className="container">
                
                {notification === true && (<Notification label="Tuote lisätty ostoskoriin" type="success" dismissible onClose={() => setNotification(false)}>Tuote on lisätty ostoskoriin onnistuneesti!</Notification>)}
                <section className="cartList">
                    <div className="cartRows">
                        <table>
                            <thead>
                                <th>ID</th>
                                <th>Quantity</th>
                                <th>Gross</th>
                                <th>Vat</th>
                                <th>Net</th>
                            </thead>
                            <tbody>
                                {cartItems}
                            </tbody>
                        </table>
                        
                    </div>

                    
                    {cartId != null && (     
                        <div className="totals">
                        <h3>Totals</h3>
                        <div class="value">Gross value: {cartTotalsGross}&euro;</div>
                        <div class="value">Vat value: {cartTotalsVat}&euro;</div>
                        <div class="value">Net value: {cartTotalsNet}&euro;</div>
                    </div>    
                    )}

                    {cartId === undefined && (
                        <Notification label="Virhetilanne" type="error">Ostoskorin haku ei onnistunut!</Notification>
                    )}

                    <div class="clear"></div>

                </section>
            </div>
            <Footer></Footer>
        </article>
        
    );
};

Cart.propTypes = {
    cartApiUrl: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
};
  
Cart.defaultProps = {
    //cartApiUrl: 'https://talpa-verkkokauppa-cart-experience-api-dev.apps.arodevtest.hel.fi/',
    cartApiUrl: 'https://talpa-verkkokauppa-cart-experience-api-test.apps.arodevtest.hel.fi/',
    userId: 'Testihenkilo'
};
