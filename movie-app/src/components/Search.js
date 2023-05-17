import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
const SearchComponent = () => {
    const [searchString, setSearchString] = useState('');
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [releaseYear, setReleaseYear] = useState('');
    const [language, setLanguage] = useState('');
    const [movies, setMovies] = useState([]);
    const apiKey = 'b91b712834ebca8f1c0c1e009c6276b6';

    useEffect(() => {
        axios
            .get('https://api.themoviedb.org/3/genre/movie/list', {
                params: {
                    api_key: apiKey, // Replace with your TMDB API key
                },
            })
            .then((response) => {
                setGenres(response.data.genres);
            })
            .catch((error) => {
                console.error('Error fetching genres:', error);
            });
    }, []);

    const handleSearchStringChange = (event) => {
        setSearchString(event.target.value);
    };

    const handleGenreChange = (event) => {
        const selectedGenreIds = Array.from(event.target.selectedOptions, (option) =>
            parseInt(option.value)
        );
        const selectedGenres = genres.filter((genre) =>
            selectedGenreIds.includes(genre.id)
        );
        setSelectedGenres(selectedGenres);
    };

    const handleReleaseYearChange = (event) => {
        setReleaseYear(event.target.value);
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        fetchMovies();
    };

    const fetchMovies = async () => {
        try {
            const response = await axios.get(
                'https://api.themoviedb.org/3/discover/movie',
                {
                    params: {
                        api_key: apiKey, // Replace with your TMDB API key
                        with_genres: selectedGenres.map((genre) => genre.id).join(','),
                        primary_release_year: releaseYear,
                        language: language,
                        include_adult: false,
                    },
                }
            );
            setMovies(response.data.results);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    return (
        <Row>
            <Col className={'col-md-12'}>
                <SearchForm
                    searchString={searchString}
                    handleSearchStringChange={handleSearchStringChange}
                    selectedGenres={selectedGenres}
                    handleGenreChange={handleGenreChange}
                    genres={genres}
                    releaseYear={releaseYear}
                    handleReleaseYearChange={handleReleaseYearChange}
                    language={language}
                    handleLanguageChange={handleLanguageChange}
                    handleSearch={handleSearch}
                />
            </Col>
            <Col className={'col-md-12'}>
                <SearchResults movies={movies} />
            </Col>
        </Row>
    );
};

export default SearchComponent;
