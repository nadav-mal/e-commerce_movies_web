import React, { useEffect, useReducer } from 'react';
import { Button } from 'react-bootstrap';
import './Cart.css';
import Title from '../utils/Title';
import axios from 'axios';
import Purchase from '../purchasePage/Purchase';
import cartReducer, { INITIAL_STATE } from "./cartReducer";
import CheckOutComponent from './CheckOutComponent';
import * as consts from '../../consts/consts';
import CartItem from './CartItem';
import EmptyCartPage from './EmptyCart';
import ModalWrapper from "./ModalWrapper";
import { ACTION_TYPES } from "./ACTION_TYPES";

/**
 The Cart component displays the user's shopping cart.
 It allows users to view and manage the items in their cart.
 */
const Cart = () => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    /**
     Empties the cart by dispatching an action to the cart reducer.
     */
    const emptyCart = () => {
        dispatch({ type: ACTION_TYPES.EMPTY_CART, payload: {} });
    };
    /**
     Fetches the cart data from the server and updates the cart state.
     It makes an HTTP GET request to retrieve the cart data.
     */
    const fetchCart = () => {
        try {
            axios.get(consts.serverCartAPI).then((response) => {
                dispatch({
                    type: ACTION_TYPES.UPDATE_CART,
                    payload: { cart: response.data.cart, cartSize: response.data.size }
                });
            });
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };
    useEffect(() => {
        fetchCart();
    }, []); // Fetch cart data when the Cart component is rendered

    /**
     Handles the click event on a movie image.
     It dispatches an action to the cart reducer with the selected image as the payload.
     @param {string} image - The URL of the selected movie image.
     */
    const handleImageClick = (image) => {
        dispatch({ type: ACTION_TYPES.HANDLE_IMAGE_CLICK, payload: { selectedImage: image } });
    };
    /**
     Handles the removal of a movie from the cart.
     It makes an HTTP POST request to remove the movie from the server-side cart.
     After removing the movie, it fetches the updated cart data from the server.
     @param {number} movieId - The ID of the movie to be removed from the cart.
     */
    const handleRemoveFromCart = (movieId) => {
        try {
            axios.post(${consts.serverCartAPI}/remove/${movieId}, null).then(() => {
                fetchCart(); // Server always holds the ground truth, so it's better to fetch.
            });
        } catch (e) {
            alert(e.message);
        }
    };
    // Check if the cart should display the purchase page
    if (state.showPurchases) {
        return <Purchase totalPrice={state.totalPrice} emptyCart={emptyCart} />;
    }

    // Check if the cart is empty
    if (!state.cartData || state.cartSize === 0) {
        return <EmptyCartPage />;
    }

    return (
        <div>
            <Title title="Cart" />
            <div>
                <CheckOutComponent state={state} dispatch={dispatch} />
                <Button className={'btn btn-danger'} onClick={emptyCart}>Clear cart</Button>
                {state.cartData.map((movie, index) => (
                    <CartItem
                        key={index}
                        movie={movie}
                        index={index}
                        handleImageClick={handleImageClick}
                        handleRemoveFromCart={handleRemoveFromCart}
                    />
                ))}
            </div>
            <ModalWrapper state={state} dispatch={dispatch} />
        </div>
    );
};

export default Cart;