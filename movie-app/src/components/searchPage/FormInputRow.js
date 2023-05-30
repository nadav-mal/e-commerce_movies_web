import { Row, Col } from 'react-bootstrap';
import React from 'react';

/**
 * A component representing a form input row with a label and an input field.
 * @param {Object} props - The component props.
 * @param {string} props.labelForText - The value for the `for` attribute of the label.
 * @param {string} props.labelTxt - The label text.
 * @param {Function} props.onChangeHandler - The event handler for the input field's `onChange` event.
 * @param {string} props.valueState - The value of the input field.
 * @returns {JSX.Element} The rendered FormInputRow.
 */
const FormInputRow = ({ labelForText, labelTxt, onChangeHandler, valueState }) => {
    return (
        <>
            <Row>
                <Col>
                    <label htmlFor={labelForText} className={'form-label'}>{labelTxt}</label>
                    <input
                        name={labelForText}
                        type="text"
                        id={labelForText}
                        value={valueState}
                        onChange={onChangeHandler}
                        className={"form-control"}
                    />
                </Col>
            </Row>
        </>
    );
};

export default FormInputRow;
