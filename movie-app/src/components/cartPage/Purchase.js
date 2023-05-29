import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Title from '../utils/Title'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../utils/Components.css';
import {addPurchaseUrl, successMessage, failureMessage, serverUnreachableMessage} from "../../consts/consts";

const Purchase = ({ totalPrice, emptyCart }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const [displayMessage, setDisplayMessage] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        const purchase = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            payment: totalPrice
        };

        axios.post(addPurchaseUrl, null, {
            params: purchase
        })
            .then(() => {
                displayMessageToUser(successMessage, true);
                emptyCart(); //Only if user managed to complete a purchase.
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    if (error.response.data && error.response.data.message) {
                        displayMessageToUser(failureMessage + error.response.data.message, false);
                    } else {
                        displayMessageToUser(failureMessage, false);
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    displayMessageToUser(serverUnreachableMessage, false);
                }
            }).finally(() => {
            resetForm();
        });
    }

    /**
     * @param message - A message to display
     * @param paymentSuccess A boolean to state if it was a good message (or a bad one)
     * A countdown is displayed as a part of the message just because in case of being redirected
     * the user should know that he is waiting on purpose and not because of an unknown delay
     */
    const displayMessageToUser = (message, paymentSuccess) => {
        let countdown = 5;
        setDisplayMessage(`${message} ${countdown}`);

        const timer = setInterval(() => {
            countdown--;
            setDisplayMessage(`${message} ${countdown}`);
            if (countdown === 0) {
                clearInterval(timer);
                setDisplayMessage('');
                if (paymentSuccess)
                    navigate('/');
            }
        }, 1000);
    }


    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
    }

    return (
        <div className="purchase-container">
            <Title />
            <h2>Purchase</h2>
            <p><strong>Total Price:</strong> ${totalPrice}</p>

            <Row>
                <Col md={6}>
                    <form className="purchase-form" onSubmit={handleSubmit}>
                        {/* Form inputs */}
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                className="form-control"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                className="form-control"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Complete Purchase</button>
                    </form>
                </Col>
            </Row>
            {displayMessage && (
                <Button className="btn btn-success">
                    <div className="message">{displayMessage}</div>
                </Button>
            )}
        </div>
    );
};

export default Purchase;
