import React, { useState, useEffect } from 'react';
import {Image, Button, Modal } from 'react-bootstrap';
import './Cart.css';
import Title from '../utils/Title';
import axios from 'axios';
import Purchase from './Purchase'
import CheckOutComponent from './CheckOutComponent'
import * as consts from '../../consts/consts'
import CartItem from './CartItem';
import EmptyCartPage from './EmptyCart'
const Cart = () => {
    const [cartData, setCartData] = useState(null);
    const [cartSize, setCartSize] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [showPurchases, setShowPurchases] = useState(false);

    const emptyCart = () => {
        const emptyCartURL = consts.serverCartAPI + '/clear'
        axios.post(emptyCartURL)
            .then(()=>{
            setCartData(null);
            setCartSize(0);
            }).catch(()=>{
        })
    }
    const fetchCart = () => {
        try {
            axios.get(consts.serverCartAPI).then((response) => {
                setCartData(response.data.cart);
                setCartSize(response.data.size);
                console.log(response.data);
            });
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []); // Fetch cart data when the Cart component is rendered

    const getTotalPrice = () => {
        if (cartData) {
            const totalPrice = cartData.reduce((total) => total + 3.99, 0);
            return totalPrice.toFixed(2);
        }
        return '0.00';
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    };
    const handleRemoveFromCart = (movieId) =>{
        console.log(movieId);
        try{
            axios.post(`${consts.serverCartAPI}/remove/${movieId}`, null, {
            }).then(()=>{
                fetchCart()
            })
        } catch(e){
        }
    }
    const closeModal = () => {
        setShowModal(false);
    };
    if(showPurchases){
    return <Purchase totalPrice={getTotalPrice()} emptyCart={emptyCart}/>
    }
    if (!cartData || cartSize ===0) {
        // Handle the case where the cart data is not available yet
        return <EmptyCartPage/>
    }

    return (
        <div>
            <Title title="Cart" />
            <div>
                <CheckOutComponent totalPrice={getTotalPrice()}
                                   setShowPurchases={setShowPurchases}/>
                <Button className={'btn btn-danger'} onClick={emptyCart}>Clear cart</Button>
                {cartData.map((movie, index) => (
                   <CartItem movie={movie}
                             index={index}
                             handleImageClick={handleImageClick}
                             handleRemoveFromCart={handleRemoveFromCart}
                   />
                ))}
            </div>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Movie poster</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image src={selectedImage} fluid />
                </Modal.Body>
                <Modal.Footer>
                    <Button className={"btn btn-danger"} onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Cart;
