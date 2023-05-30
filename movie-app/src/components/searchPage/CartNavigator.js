import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

/**
 * A component representing the cart navigator displaying the number of items in the cart.
 * @param {Object} props - The component props.
 * @param {number} props.cartSize - The number of items in the cart.
 * @returns {JSX.Element} The rendered CartNavigator.
 */
const CartNavigator = ({ cartSize }) => {
    return (
        <>
            <Row>
                <Col className="col-md-12" style={{ backgroundColor: '#f8f9fa', padding: '10px' }}>
                    <Button className="search-button" href={'/cart'}> {cartSize} Items. Click here to go to cart.</Button>
                </Col>
            </Row>
        </>
    );
}

export default CartNavigator;
