import React, { useState, useEffect } from 'react';
import { Row, Col, Image, Button, Modal } from 'react-bootstrap';
import './Cart.css';
import Title from './Title';
import axios from 'axios';

const Cart = () => {
    const [cartData, setCartData] = useState(null);
    const [cartSize, setCartSize] = useState(0);
    const [movieData, setMovieData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const apiKey = 'b91b712834ebca8f1c0c1e009c6276b6';
    const baseImageUrl = 'https://image.tmdb.org/t/p/';

    const fetchCart = () => {
        try {
            axios.get('http://localhost:8080/cart').then((response) => {
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
            const totalPrice = cartData.reduce((total, movie) => total + 3.99, 0);
            return totalPrice.toFixed(2);
        }
        return '0.00';
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    if (!cartData) {
        // Handle the case where the cart data is not available yet
        return (
            <div>
                <Title title="Cart" />
                <div className="empty-cart">
                    <p>Loading cart...</p>
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
                    <p>Your cart is empty. Go shop for movies! :)</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Title title="Cart" />
            <div>
                {cartData.map((movie, index) => (
                    <div key={index} className="cart-item">
                        <Row>
                            <Col className={'col-md-4 col-xs-6'}>
                                <Image
                                    src={`${baseImageUrl}w200${movie.posterPath}`}
                                    onClick={() => handleImageClick(`${baseImageUrl}original${movie.posterPath}`)}
                                    className="clickable-image"
                                />
                            </Col>
                            <Col className={'col-md-8 col-xs-6'}>
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
                        </Row>
                    </div>
                ))}
                <Row>
                    <Col className="text-end">
                        <p className="total-price">Total Price: ${getTotalPrice()}</p>
                    </Col>
                </Row>
            </div>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Large Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image src={selectedImage} fluid />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Cart;
