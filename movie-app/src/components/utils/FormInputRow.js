import { Row, Col } from 'react-bootstrap';
import React from 'react';

/**
 * Component for rendering a form input row.
 *
 * @param {object} props - The props for the FormInputRow component.
 * @param {string} props.labelForText - The value for the 'for' attribute of the label element.
 * @param {string} props.labelTxt - The text to be displayed as the label.
 * @param {function} props.onChangeHandler - The event handler function for the input onChange event.
 * @param {string} props.valueState - The value of the input field.
 * @param {boolean} [props.required=false] - Indicates if the input field is required.
 * @param {string} [props.type="text"] - The type of the input field.
 * @returns {JSX.Element} - The rendered FormInputRow component.
 */
const FormInputRow = ({ labelForText, labelTxt, onChangeHandler, valueState, required = false, type = "text" }) => {
    return (
        <>
            <Row>
                <Col>
                    <label htmlFor={labelForText} className={"form-label"}>
                        {labelTxt}
                    </label>
                    <input
                        name={labelForText}
                        type={type}
                        id={labelForText}
                        value={valueState}
                        onChange={onChangeHandler}
                        className={"form-control"}
                        required={required}
                    />
                </Col>
            </Row>
        </>
    );
};

export default FormInputRow;
