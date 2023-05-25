import React, { useState } from 'react';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import axios from 'axios'
import './Components.css';
const SearchResults = ({ movies }) => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const handleAddToCart = (movieId, movieName, posterPath,releaseDate,overview) => {
        console.log(`Adding ${movieName} (ID: ${movieId}) to the cart...`);
        const addToCartURL = 'http://localhost:8080/cart/add';
        // Make the HTTP request to the Spring REST API
        axios.post(addToCartURL, null, {
            params: {
                movieId: movieId,
                movieName: movieName,
                posterPath: posterPath,
                releaseDate: releaseDate,
                overview:overview
            }
        })
            .then(response => {
                console.log('Added to cart successfully:', response.data);
                console.log(response);
                // Handle the response from the API if needed
            })
            .catch(error => {
                console.error('Error adding to cart:', error);
                // Handle the error if needed
            });
    };


    const baseImageUrl = 'https://image.tmdb.org/t/p/';

    const handleOpenModal = (movie) => {
        setSelectedMovie(movie);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedMovie(null);
        setShowModal(false);
    };

    return (
        <Row>
            <Col>
                <Row className={'search-row'}>
                    <h3>Search Results</h3>
                    <hr />
                </Row>
                <Row>
                    <Col>
                        {movies.map((movie, index) => (
                            <Row key={movie.id} className="movie-row">
                                <Col className="col-md-8">
                                        <h3>{movie.title}</h3>
                                        <p>Original language: {movie.original_language}</p>
                                </Col>
                                <Col className={'col-md-2'}>
                                    <button className="add-to-cart-button" onClick={() => handleAddToCart(movie.id, movie.title,movie.poster_path,movie.release_date,movie.overview)}>
                                        Add to Cart
                                    </button>
                                </Col>
                                <Col className={'col-md-2'}>
                                    <button className="add-to-cart-button" onClick={()=> handleOpenModal(movie)}>
                                        See movie poster
                                    </button>
                                </Col>
                                <Col className={'col-12'}>
                                    <p>{movie.overview}</p>
                                </Col>
                                {index !== movies.length - 1 && <hr className="separator" />}
                            </Row>
                        ))}
                    </Col>
                </Row>
                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Body>
                        {selectedMovie && (
                            <div>
                                <h5>{selectedMovie.title}</h5>
                                <img
                                    src={`${baseImageUrl}w400${selectedMovie.poster_path}`}
                                    alt={selectedMovie.title}
                                    className="modal-image"
                                />
                            </div>

                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className={'add-to-cart-button'} variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Col>
        </Row>
    );
};

export default SearchResults;
