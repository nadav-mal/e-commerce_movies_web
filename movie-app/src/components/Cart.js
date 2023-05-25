import React, { useState, useEffect } from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap';
import './Cart.css';
import Title from './Title';
import axios from 'axios';

const Cart = () => {
    const [cartData, setCartData] = useState(null);

    const [cartSize, setCartSize] = useState(0);
    const [movieData, setMovieData] = useState([]);
    const apiKey = 'b91b712834ebca8f1c0c1e009c6276b6';
    const baseImageUrl = 'https://image.tmdb.org/t/p/';

    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        if(cartData){
            cartData.forEach(movie =>{ fetchMovieData(movie.movieId)});
        }
    }, [cartData]);

    const fetchCart = () => {
        try {
            axios.get('http://localhost:8080/cart')
                .then(response=>{
                    setCartData(response.data.cart);
                    setCartSize(response.data.size);
                })
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const fetchMovieData = async (movieId) => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
            );
            console.log(response.data);
            addMovieData(response.data);
        } catch (error) {
            console.error('Error fetching movie data:', error);
            return null;
        }
    };
    const addMovieData = (newMovie) => {
        const existingMovie = movieData.find((movie) => movie.movieId === newMovie.movieId);
        if(!existingMovie)
            setMovieData((prevMovieData) => [...prevMovieData, newMovie]);
    };

    const getTotalPrice = () => {
        if (cartData && cartData.cart) {
            const totalPrice = cartData.cart.reduce((total, movie) => total + 3.99, 0);
            return totalPrice.toFixed(2);
        }
        return '0.00';
    };

    if (!cartData) {
        // Handle the case where the cart data is not available yet
        return (
            <div>
                <Title title="Cart" />
                <div className="empty-cart">
                    <p>Loading cart...</p>
                </div>
            </div>
        );
    }

    if (cartSize===0) {
        // Handle the case where the cart is empty
        return (
            <div>
                <Title title="Cart" />
                <div className="empty-cart">
                    <p>Your cart is empty. Go shop for movies! :)</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Title title="Cart" />
            <div>
                {movieData.map((movie, index) => (
                    <div key={index} className="cart-item">
                        <Row>
                            <Col xs={3}>
                                <Image src={`${baseImageUrl}w200${movie.poster_path}`} />
                            </Col>
                            <Col xs={6}>
                                <h3>{movie.movieName}</h3>
                                <p>Release Date: {movie.releaseDate}</p>
                                <p>Price: $3.99</p>
                            </Col>
                        </Row>
                    </div>
                ))}
                <Row>
                    <Col className="text-end">
                        <p className="total-price">Total Price: ${getTotalPrice()}</p>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Cart;