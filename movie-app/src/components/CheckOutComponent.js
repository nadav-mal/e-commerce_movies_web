import {Col, Row} from "react-bootstrap";
import React from "react";

const CheckOutComponent = ({totalPrice, setShowPurchases}) =>{
    return(<Row>
        <Col className="col-sm-6 col-md-2">
            <p className="total-price">Total Price: {totalPrice}$</p>
        </Col>
        <Col className="col-sm-6 col-md-10">
            <button className={'btn btn-primary'} onClick={()=> setShowPurchases(true)}>
                Checkout
            </button>
        </Col>
    </Row>)
}
export default CheckOutComponent;