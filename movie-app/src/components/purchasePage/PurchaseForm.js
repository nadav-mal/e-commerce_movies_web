import React from "react";
import { Col, Row } from "react-bootstrap";
import FormInputRow from "../utils/FormInputRow";
import { ACTION_TYPES } from "./ACTION_TYPES";

/**
 * Component for the purchase form.
 *
 * @param {object} props - The props for the PurchaseForm component.
 * @param {object} props.state - The state object containing form input values.
 * @param {function} props.dispatch - The dispatch function to update the state.
 * @param {function} props.handleSubmit - The function to handle form submission.
 * @returns {JSX.Element} - The rendered PurchaseForm component.
 */
const PurchaseForm = ({ state, dispatch, handleSubmit }) => {
    const handleChange = e => {
        dispatch({ type: ACTION_TYPES.CHANGE_INPUT, payload: { name: e.target.name, value: e.target.value } });
    };

    return (
        <Row>
            <Col md={12}>
                <form className="purchase-form" onSubmit={handleSubmit}>
                    <FormInputRow
                        labelForText={"firstName"}
                        labelTxt={"First Name:"}
                        value={state.firstName}
                        onChangeHandler={handleChange}
                        required={true}
                    />
                    <FormInputRow
                        labelForText={"lastName"}
                        labelTxt={"Last Name:"}
                        value={state.lastName}
                        onChangeHandler={handleChange}
                        required={true}
                    />
                    <FormInputRow
                        labelForText={"email"}
                        labelTxt={"Email:"}
                        value={state.email}
                        onChangeHandler={handleChange}
                        required={true}
                    />
                    <button type="submit" className="btn btn-primary">Complete Purchase</button>
                </form>
            </Col>
        </Row>
    );
};

export default PurchaseForm;
