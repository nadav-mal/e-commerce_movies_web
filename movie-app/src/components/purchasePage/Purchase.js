import React, { useState,useReducer } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Title from '../utils/Title'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../utils/Components.css';
import { successMessage} from "../../consts/consts";
import purchaseReducer, {INITIAL_STATE} from "./purchaseReducer";
import {ACTION_TYPES} from "./ACTION_TYPES";
import PurchaseForm from './PurchaseForm'
const Purchase = ({ totalPrice, emptyCart }) => {
    const [state,dispatch] = useReducer(purchaseReducer,INITIAL_STATE);
    const navigate = useNavigate();
    const [displayMessage, setDisplayMessage] = useState('');



    function handleSubmit(event) {
        event.preventDefault();
        const purchase = {
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            payment: totalPrice
        };
        dispatch({type:ACTION_TYPES.HANDLE_SUBMIT, payload:{purchase: purchase}});
        if(state.message !== successMessage)
            displayMessageToUser(true);
        else
            displayMessageToUser(false);
        emptyCart();
    }
    /**
     * @param message - A message to display
     * @param paymentSuccess A boolean to state if it was a good message (or a bad one)
     * A countdown is displayed as a part of the message just because in case of being redirected
     * the user should know that he is waiting on purpose and not because of an unknown delay
     */
    const displayMessageToUser = (paymentSuccess) => {
        let countdown = 5;
        paymentSuccess && state.message !=='' ? setDisplayMessage(`${state.message} ${countdown}`)
            : setDisplayMessage(state.message);

        const timer = setInterval(() => {
            countdown--;
            paymentSuccess? setDisplayMessage(`${state.message} ${countdown}`): <> </>;
            if (countdown === 0) {
                clearInterval(timer);
                setDisplayMessage('');
                if (paymentSuccess)
                    navigate('/');
            }
        }, 1000);
    }

    return (
        <div>
            <Title />
            <h2>Purchase</h2>
            <hr/>
            <PurchaseForm
                state={state}
                dispatch={dispatch}
                handleSubmit={handleSubmit}
            />
            <Row>
                <h5><strong>Total Price:</strong> ${totalPrice}</h5>
            </Row>
            {displayMessage!=='' && (
                <Button className="btn btn-success">
                    <div className="message">{displayMessage}</div>
                </Button>
            )}
        </div>
    );
};

export default Purchase;
