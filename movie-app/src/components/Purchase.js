import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Title from './Title'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Components.css';
import {addPurchaseUrl, successMessage, failureMessage, serverUnreachableMessage} from "../consts/consts";

const Purchase = ({ totalPrice }) => {
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

    const displayMessageToUser = (message, paymentSuccess) => {
        setDisplayMessage(message);
        setTimeout(() => {
            setDisplayMessage('');
            if (paymentSuccess)
                navigate('/');
        }, 5000);
    }

    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
    }

    return (
        <div>
            <Title />
            <h2>Purchase</h2>
            <p>Total Price: ${totalPrice}</p>

            <Row>
                <Col md={6}>
                    <form onSubmit={handleSubmit}>
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
                <Button className={'btn btn-success'}>
                    <div className="message">{displayMessage}</div>
                </Button>
            )}
        </div>
    );
};

export default Purchase;
