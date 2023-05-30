import {Col, Row, Button, Modal, Image} from 'react-bootstrap'
import React from "react";

const ModalWrapper = ({state, dispatch}) =>{
    const closeModal = () => {
        dispatch({type:"CLOSE_MODAL", payload:{}});
    };

    return(<Modal show={state.showModal} onHide={closeModal}>
        <Modal.Header closeButton>
            <Modal.Title>Movie poster</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Image src={state.selectedImage} fluid />
        </Modal.Body>
        <Modal.Footer>
            <Button className={"btn btn-danger"} onClick={closeModal}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>)
}

export default ModalWrapper;