import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import { Footer, Tooltip, Card, Navigation, Container, Button,Notification } from "hds-react";

import './product.css';
import styles from "hds-react";

export const Products = ({ productApiUrl, productId, cartApiUrl, userId, ...props }) => {

    const [productList,setProductList]=useState([]);
    const [notification, setNotification] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [cartId, setCartId] = useState();

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

        fetch(cartApiUrl+cartId)
            .then(function(response){
                console.log(response)
                return response.json();
            })
            .then(function(myJson) {
                if (myJson.items != null && myJson.items.length > 0) {
                    setCartCount(myJson.items.length);
                } 
            });

        console.log(requestOptions);
    }

    const addToCart=(e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({productId: e.target.getAttribute('productId'), quantity: 1})
        };

        fetch(cartApiUrl+cartId+'/items', requestOptions)
            .then(function(response){
                console.log(response)
                return response.json();
            })
            .then(function(myJson) {
                if (myJson.items.length > 0) {
                    setNotification(true);
                    const newCount = myJson.items.length;
                    setCartCount(newCount);
                }
            });

        console.log(requestOptions);
    }

    const getProductList=()=>{
        fetch(productApiUrl+productId
        ,{
          headers : { 
            "Access-Control-Allow-Origin" : "*",
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }
        )
          .then(function(response){
            console.log(response)
            return response.json();
          })
          .then(function(myJson) {

            setProductList(myJson);
          });
      }
      useEffect(()=>{
        createCart();
        getProductList();
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
                    <a href="#"><div className="cartStatus">Ostoskori<div className="cartCount">{cartCount}</div></div></a>
                </Navigation.Actions>
            </Navigation>
            <div className="container">
                
                {notification === true && (<Notification label="Tuote lisätty ostoskoriin" type="success" dismissible onClose={() => setNotification(false)}>Tuote on lisätty ostoskoriin onnistuneesti!</Notification>)}
                <section className="productList">
                    {productList.productId != null && (
                    <Card
                        border
                        heading={productList.name}
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    >
                        <button onClick={addToCart} productId={productList.productId} type="button" className="Button-module_button__1msFE button_hds-button__2A0je Button-module_primary__2LfKB button_hds-button--primary__2NVvO"><span className="Button-module_label__a4np1 button_hds-button__label__2EQa-">Lisää ostoskoriin</span></button>

                        <div className="clear"></div>
                    </Card>
                    )}

                    {productList.productId === undefined && (
                        <Notification label="Virhetilanne" type="error">Tuotteiden haku ei onnistunut!</Notification>
                    )}

                </section>
            </div>
            <Footer></Footer>
        </article>
        
    );
};

Products.propTypes = {
    productApiUrl: PropTypes.string.isRequired,
    cartApiUrl: PropTypes.string.isRequired,
    productId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
};
  
Products.defaultProps = {
    productApiUrl: 'https://talpa-verkkokauppa-product-experience-api-dev.apps.arodevtest.hel.fi/',
    cartApiUrl: 'https://talpa-verkkokauppa-cart-experience-api-dev.apps.arodevtest.hel.fi/',
    productId: '97249ce6-b8ac-3b19-b81a-c026c4f0488b',
    userId: 'Testihenkilo'
};