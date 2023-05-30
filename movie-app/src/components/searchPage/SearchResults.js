import React, { useState } from 'react';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import '../utils/Components.css';
import {
    baseImageUrl,
    serverCartAPI,
    addToCart,
    addErrMsg,
} from '../../consts/consts';

/**
 * Represents the search results component.
 * Displays a list of movies with options to add them to the cart and view the movie poster.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.movies - The list of movies to display.
 * @param {function} props.dispatch - The dispatch function for Redux actions.
 * @returns {JSX.Element} The JSX element representing the search results component.
 */
const SearchResults = ({ movies, dispatch }) => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showModal, setShowModal] = useState(false);

    /**
     * Handles adding a movie to the cart.
     *
     * @param {number} movieId - The ID of the movie.
     * @param {string} movieName - The name of the movie.
     * @param {string} posterPath - The path to the movie's poster image.
     * @param {string} releaseDate - The release date of the movie.
     * @param {string} overview - The overview of the movie.
     */
    const handleAddToCart = (movieId, movieName, posterPath, releaseDate, overview) => {
        const addToCartURL = serverCartAPI + addToCart;
        // Make the HTTP request to the Spring REST API
        axios
            .post(addToCartURL, null, {
                params: {
                    movieId: movieId,
                    movieName: movieName,
                    posterPath: posterPath,
                    releaseDate: releaseDate,
                    overview: overview,
                },
            })
            .then((response) => {
                dispatch({ type: 'CHANGE_INPUT', payload: { name: 'cartSize', value: response.data } });
            })
            .catch(() => {
                alert(addErrMsg);
            });
    };

    /**
     * Handles opening the modal to display the movie poster.
     *
     * @param {Object} movie - The selected movie object.
     */
    const handleOpenModal = (movie) => {
        setSelectedMovie(movie);
        setShowModal(true);
    };

    /**
     * Handles closing the modal.
     */
    const handleCloseModal = () => {
        setSelectedMovie(null);
        setShowModal(false);
    };

    return (
        <>
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
                                        <button
                                            className="add-to-cart-button"
                                            onClick={() =>
                                                handleAddToCart(movie.id, movie.title, movie.poster_path, movie.release_date, movie.overview)
                                            }
                                        >
                                            Add to Cart
                                        </button>
                                    </Col>
                                    <Col className={'col-md-2'}>
                                        <button className="add-to-cart-button" onClick={() => handleOpenModal(movie)}>
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
        </>
    );
};

export default SearchResults;