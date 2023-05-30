import React, { useState, useEffect,useReducer } from 'react';
import {Image, Button, Modal } from 'react-bootstrap';
import './Cart.css';
import Title from '../utils/Title';
import axios from 'axios';
import Purchase from '../purchasePage/Purchase'
import cartReducer,{INITIAL_STATE} from "./cartReducer";
import CheckOutComponent from './CheckOutComponent'
import * as consts from '../../consts/consts'
import CartItem from './CartItem';
import EmptyCartPage from './EmptyCart'
import ModalWrapper from "./ModalWrapper";
import {ACTION_TYPES} from "./ACTION_TYPES";

const Cart = () => {
    const [state, dispatch] = useReducer(cartReducer,INITIAL_STATE);
    const emptyCart = () => {
        dispatch({type:ACTION_TYPES.EMPTY_CART, payload:{}});
    }
    const fetchCart = () => {
        try {
            axios.get(consts.serverCartAPI).then((response) => {
                dispatch({type:ACTION_TYPES.UPDATE_CART, payload:{cart:response.data.cart,cartSize:response.data.size}})
            });
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };
    useEffect(() => {
        fetchCart();
    }, []); //Fetch cart data when the Cart component is rendered


    const handleImageClick = (image) => {
        dispatch({type:ACTION_TYPES.HANDLE_IMAGE_CLICK,payload:{selectedImage: image}})
    };
    const handleRemoveFromCart = (movieId) =>{
        try{
            axios.post(`${consts.serverCartAPI}/remove/${movieId}`, null, {
            }).then(()=>{
                fetchCart()//server always hold the ground truth, so it's better to fetch.
            })
        } catch(e){
            alert(e.message);
        }
    }
    if(state.showPurchases)
    return <Purchase totalPrice={state.totalPrice} emptyCart={emptyCart}/>

    if (!state.cartData || state.cartSize ===0)
        return <EmptyCartPage/>

    return (
        <div>
            <Title title="Cart" />
            <div>
                <CheckOutComponent state={state}
                                   dispatch={dispatch}/>
                <Button className={'btn btn-danger'} onClick={emptyCart}>Clear cart</Button>
                {state.cartData.map((movie, index) => (
                   <CartItem key={index} movie={movie}
                             index={index}
                             handleImageClick={handleImageClick}
                             handleRemoveFromCart={handleRemoveFromCart}
                   />
                ))}
            </div>
            <ModalWrapper state={state}
                          dispatch={dispatch}/>
        </div>
    );
};

export default Cart;
