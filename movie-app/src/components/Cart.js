import React from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap';
import './Cart.css';
import Title from './Title';

const Cart = ({ cart, removeFromCart, emptyCart }) => {
    const getTotalPrice = () => {
        const totalPrice = cart.reduce((total, movie) => total + 3.99, 0);
        return totalPrice.toFixed(2);
    };

    if (!cart) {
        // Handle the case where the cart is undefined or not provided
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
            {cart.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty. Go shop for movies! :)</p>
                </div>
            ) : (
                <div>
                    {cart.map((movie) => (
                        <div key={movie.id} className="cart-item">
                            <Row>
                                <Col xs={3}>
                                    <Image src={movie.image} alt={movie.title} fluid />
                                </Col>
                                <Col xs={6}>
                                    <h3>{movie.title}</h3>
                                    <p>Release Date: {movie.releaseDate}</p>
                                    <p>Price: $3.99</p>
                                </Col>
                                <Col xs={3} className="text-end">
                                    <Button variant="danger" onClick={() => removeFromCart(movie)}>
                                        Remove
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    ))}
                    <Row>
                        <Col className="text-end">
                            <p className="total-price">Total Price: ${getTotalPrice()}</p>
                            <Button variant="primary" onClick={emptyCart}>
                                Empty Cart
                            </Button>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
};

export default Cart;
