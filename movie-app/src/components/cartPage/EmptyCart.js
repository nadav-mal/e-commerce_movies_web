import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Title from '../utils/Title';
import './EmptyCart.css'; // Import the CSS file for styling

const EmptyCart = () => {
    return (
        <>
            <Title />
            <Row className="empty-cart-row">
                <p className="empty-cart-message">Your cart is empty</p>
            </Row>
            <Row className="empty-cart-row">
                <Col className="empty-cart-col">
                    <Button className="btn btn-primary" href="/search">
                        Buy some movies here!
                    </Button>
                </Col>
            </Row>
        </>
    );
};
export default EmptyCart;
