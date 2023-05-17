// SearchResults.js
import React from 'react';
import { Row, Col } from 'react-bootstrap';

const SearchResults = ({ movies }) => {
    return (
        <Row>
            <Col>
                <h2>Search Results:</h2>
                {movies.map((movie) => (
                    <Row key={movie.id}>
                        <h3>{movie.title}</h3>
                        <p>{movie.overview}</p>
                    </Row>
                ))}
            </Col>
        </Row>
    );
};

export default SearchResults;
