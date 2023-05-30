import {Row,Col} from 'react-bootstrap';
import React from 'react';

const FormInputRow = ({labelForText,labelTxt, onChangeHandler, valueState}) =>{
    return(<>
    <Row>
        <Col>
            <label htmlFor={labelForText} className={'form-label'}>{labelTxt}</label>
            <input name={labelForText}
                type="text"
                id={labelForText}
                value={valueState}
                onChange={onChangeHandler}
                className={"form-control"}/>
        </Col>
    </Row>
    </>)
};

export default FormInputRow;