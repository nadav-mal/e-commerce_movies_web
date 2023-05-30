import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {apiKey} from '../../consts/consts';
import Title from '../utils/Title';
import axios from 'axios';
import './HomePage.css';


/**
 * A component representing the home page of the movie store.
 * It displays the welcome message and the top rated movies.
 * @returns {JSX.Element} The rendered HomePage.
 */
const HomePage = () => {
    const [topRated, setTopRated] = useState([]);

    useEffect(() => {
        fetchTopRatedMovies();
    }, []);

    /**
     * Fetches the top rated movies from the API and updates the state with the retrieved data.
     */
    const fetchTopRatedMovies = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
            );
            setTopRated(response.data.results);
        } catch (error) {
            console.error('Error fetching top rated movies:', error);
            alert('Error fetching top rated movies');
        }
    };

    /**
     * Renders the movies in rows with three movies per row.
     * @returns {Array<JSX.Element>} An array of rows containing the rendered movies.
     */
    const renderMovies = () => {
        const rows = [];
        for (let i = 0; i < topRated.length; i += 3) {
            const moviesInRow = topRated.slice(i, i + 3);
            const movieRow = moviesInRow.map((movie) => (
                <Col key={movie.id} md={4}>
                    <div className="movie-card">
                        <h4>{movie.title}</h4>
                        <p>Rating: {movie.vote_average}</p>
                        <p>{movie.overview}</p>
                    </div>
                </Col>
            ));
            rows.push(
                <Row key={i} className="mb-3">
                    {movieRow}
                </Row>
            );
        }
        return rows;
    };

    return (
        <>
            <Title />
            <Container>
                <Row>
                    <Col>
                        <h1>Welcome to Our Movie Store!</h1>
                        <p>
                            Browse our wide selection of movies and find your favorites.
                            Add them to your cart and complete your purchase without the need for registration.
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>Top Rated Movies</h2>
                        {renderMovies()}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default HomePage;
