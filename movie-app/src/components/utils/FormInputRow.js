import {Row,Col} from 'react-bootstrap';
import React from 'react';

const FormInputRow = ({labelForText,labelTxt, onChangeHandler, valueState,required=false,type="text"}) =>{
    return(<>
    <Row>
        <Col>
            <label htmlFor={labelForText} className={'form-label'}>{labelTxt}</label>
            <input name={labelForText}
                type={type}
                id={labelForText}
                value={valueState}
                onChange={onChangeHandler}
                className={"form-control"}
            required={required}
            />

        </Col>
    </Row>
    </>)
};

export default FormInputRow;