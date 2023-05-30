import React from "react";
import { Button, Modal, Image } from 'react-bootstrap';

/**
 The ModalWrapper component displays a modal with a movie poster.
 It receives the state and dispatch as props from its parent component.
 */
const ModalWrapper = ({ state, dispatch }) => {
    const closeModal = () => {
        dispatch({ type: "CLOSE_MODAL", payload: {} });
    };

    return (
        <Modal show={state.showModal} onHide={closeModal}>
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
        </Modal>
    );
};

export default ModalWrapper;