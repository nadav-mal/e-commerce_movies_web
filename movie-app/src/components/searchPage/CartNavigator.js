import React,{useState,useEffect} from 'react';
import {Row,Col,Button} from 'react-bootstrap';
import * as consts from "../../consts/consts";
import axios from "axios";

const CartNavigator = ({cartSize}) => {


    return(<>
        <Row>
            <Col className="col-md-12" style={{ backgroundColor: '#f8f9fa', padding: '10px' }}>
                <Button className="search-button" href={'/cart'}> {cartSize} Items. Click here to go to cart.</Button>
            </Col>
        </Row>
    </>)
}
export default CartNavigator;