import React, { useState, useEffect } from 'react';
import { Row, Col, Image, Button, Modal } from 'react-bootstrap';
import './Cart.css';
import Title from './Title';
import axios from 'axios';
import Purchase from './Purchase'
import CheckOutComponent from './CheckOutComponent'
const Cart = () => {
    const [cartData, setCartData] = useState(null);
    const [cartSize, setCartSize] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [showPurchases, setShowPurchases] = useState(false);
    const baseImageUrl = 'https://image.tmdb.org/t/p/';
    const serverCartAPI = 'http://localhost:8080/cart'

    const emptyCart = () => {
        const emptyCartURL = serverCartAPI + '/clear'
        axios.post(emptyCartURL)
            .then(()=>{
            setCartData(null);
            setCartSize(0);
            }).catch(()=>{
        })
    }
    const fetchCart = () => {
        try {
            axios.get(serverCartAPI).then((response) => {
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
            axios.post(`${serverCartAPI}/remove/${movieId}`, null, {
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
    return <Purchase totalPrice={getTotalPrice()}/>
    }
    if (!cartData) {
        // Handle the case where the cart data is not available yet
        return (
            <div>
                <Title/>
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                    <Button className={'btn btn-primary'} href={'/search'}>Shop some movies</Button>

                </div>
            </div>
        );
    }

    if (cartSize === 0) {
        // Handle the case where the cart is empty
        return (
            <div>
                <Title title="Cart" />
                <div className="empty-cart">
                    <p>Your cart is empty.</p>
                    <Button className={'btn btn-primary'} href={'/search'}>Buy some movies here!</Button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Title title="Cart" />
            <div>
                <CheckOutComponent totalPrice={getTotalPrice()}
                                   setShowPurchases={setShowPurchases}/>
                <Button className={'btn btn-danger'} onClick={emptyCart}>Clear cart</Button>
                {cartData.map((movie, index) => (
                    <div key={index} className="cart-item">
                        <Row>
                            <Col className={'col-sm-12 col-md-3 d-none d-sm-block'}>
                                <Image
                                    src={`${baseImageUrl}w200${movie.posterPath}`}
                                    onClick={() => handleImageClick(`${baseImageUrl}original${movie.posterPath}`)}
                                    className="clickable-image"
                                />
                            </Col>
                            <Col className={'col-sm-12 col-md-7'}>
                                <h3>{movie.movieName}</h3>
                                <p>
                                    <strong>Release Date:</strong> {movie.releaseDate}
                                </p>
                                <p>
                                    <strong>Price: </strong> $3.99
                                </p>
                                <hr />
                                <b>Overview:</b>
                                <p>{movie.overview}</p>
                            </Col>
                            <Col className={'col-sm-3 col-md-2'}>
                                <button className={'btn btn-danger'} onClick={()=> handleRemoveFromCart(movie.movieId)}>
                                    Remove from cart
                                </button>
                            </Col>
                        </Row>
                    </div>
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
