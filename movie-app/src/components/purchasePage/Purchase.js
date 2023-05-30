import React, { useState, useReducer } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Title from '../utils/Title'
import { useNavigate } from "react-router-dom";
import '../utils/Components.css';
import { successMessage } from "../../consts/consts";
import purchaseReducer, { INITIAL_STATE } from "./purchaseReducer";
import { ACTION_TYPES } from "./ACTION_TYPES";
import PurchaseForm from './PurchaseForm';

/**
 * Component for handling the purchase process.
 *
 * @param {object} props - The props for the Purchase component.
 * @param {number} props.totalPrice - The total price of the purchase.
 * @param {function} props.emptyCart - The function to empty the cart.
 * @returns {JSX.Element} - The rendered Purchase component.
 */
const Purchase = ({ totalPrice, emptyCart }) => {
    const [state, dispatch] = useReducer(purchaseReducer, INITIAL_STATE);
    const navigate = useNavigate();
    const [displayMessage, setDisplayMessage] = useState('');

    /**
     * Handles the form submission for the purchase.
     *
     * @param {object} event - The form submit event.
     */
    function handleSubmit(event) {
        event.preventDefault();
        const purchase = {
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            payment: totalPrice
        };
        dispatch({ type: ACTION_TYPES.HANDLE_SUBMIT, payload: { purchase: purchase } });
        if (state.message !== successMessage)
            displayMessageToUser(true);
        else
            displayMessageToUser(false);
        emptyCart();
    }

    /**
     * Displays a message to the user.
     *
     * @param {boolean} paymentSuccess - Indicates if the payment was successful.
     */
    const displayMessageToUser = (paymentSuccess) => {
        let countdown = 5;
        paymentSuccess && state.message !== '' ? setDisplayMessage(`${state.message} ${countdown}`)
            : setDisplayMessage(state.message);

        const timer = setInterval(() => {
            countdown--;
            paymentSuccess ? setDisplayMessage(`${state.message} ${countdown}`) : setDisplayMessage('');
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
            <hr />
            <PurchaseForm
                state={state}
                dispatch={dispatch}
                handleSubmit={handleSubmit}
            />
            <Row>
                <h5><strong>Total Price:</strong> ${totalPrice}</h5>
            </Row>
            {displayMessage !== '' && (
                <Button className="btn btn-success">
                    <div className="message">{displayMessage}</div>
                </Button>
            )}
        </div>
    );
};

export default Purchase;
