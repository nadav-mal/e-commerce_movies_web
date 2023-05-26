import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Title from './Title';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
    const [topRated, setTopRated] = useState([]);
    const API_KEY = 'b91b712834ebca8f1c0c1e009c6276b6';

    useEffect(() => {
        fetchTopRatedMovies();
    }, []);

    const fetchTopRatedMovies = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
            );
            setTopRated(response.data.results);
        } catch (error) {
            console.error('Error fetching top rated movies:', error);
            alert('Error fetching top rated movies');
        }
    };

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
