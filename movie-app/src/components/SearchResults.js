// SearchResults.js
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './Components.css';

const SearchResults = ({ movies }) => {
    const handleAddToCart = (movieId, movieName) => {
        // Trigger function to handle API call with movieId and movieName
        // Make your API call here using the provided movieId and movieName
        console.log(`Adding ${movieName} (ID: ${movieId}) to the cart...`);
    };

    return (
        <Row>
            <Col>
                <Row className={'search-row'}>
                    <h2>Search Results:</h2>
                </Row>
                <Row>
                    <Col>
                        {movies.map((movie, index) => (
                            <Row key={movie.id} className="movie-row">
                                <Col className="col-md-9">
                                    <button className="movie-button">
                                        <h3>{movie.title}</h3>
                                        <p>Original language: {movie.original_language}</p>
                                    </button>
                                </Col>
                                <Col className={'col-md-3'}>
                                    <button className="add-to-cart-button" onClick={() => handleAddToCart(movie.id, movie.title)}>
                                        Add to Cart
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
            </Col>
        </Row>
    );
};

export default SearchResults;
