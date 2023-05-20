import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
const SearchComponent = () => {


    const [searchString, setSearchString] = useState('');
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [releaseYear, setReleaseYear] = useState('');
    const [language, setLanguage] = useState('');
    const [movies, setMovies] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    const [showSearchHistory, setShowSearchHistory] = useState(false);
    const apiKey = 'b91b712834ebca8f1c0c1e009c6276b6';
    const genresMap= new Map();
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
        setShowSearchHistory(false)
        fetchMovies();
        addToSearchHistory();
    };
    const handleSearchAgain = (search) => {
        setShowSearchHistory(false)
        setSearchString(search.searchString);
        setSelectedGenres(search.selectedGenres);
        setReleaseYear(search.releaseYear);
        setLanguage(search.language);
        fetchMovies();
    };

    const addToSearchHistory = () => {
        const isSearchAlreadyExists = searchHistory.some((entry) => {
            // Compare the searchString, selectedGenres, releaseYear, and language
            return (
                entry.searchString === searchString &&
                entry.releaseYear === releaseYear &&
                entry.language === language
            );
        });
        if( searchString === '' && releaseYear === '' && language === '' && (!selectedGenres.length))
            return;
        if (!isSearchAlreadyExists) {
            selectedGenres.forEach((genre) => {
                genresMap.set(genre.name, genre.id);
            });

            const genreNames = selectedGenres.map((genre) => `${genre.name}`);
            console.log(genreNames);

            const searchEntry = {
                searchString: searchString,
                selectedGenres: genreNames,
                releaseYear: releaseYear,
                language: language,
            };
            setSearchHistory((prevHistory) => [...prevHistory, searchEntry]);
            setSelectedGenres([]);
        }
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

    const deleteSearch = (index) => {
        setSearchHistory((prevHistory) => {
            const updatedHistory = [...prevHistory];
            updatedHistory.splice(index, 1);
            return updatedHistory;
        });
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
                <div>
                    <Button onClick={() => setShowSearchHistory(!showSearchHistory)}>
                        Show Search History
                    </Button>
                </div>
                { showSearchHistory && (
                    <div>
                        <h3>Search History</h3>
                        <hr/>
                        {searchHistory.map((search, index) => (
                            <div key={index}>
                                <b>Search String:  {search.searchString}</b>
                                <br/>
                                <b>Selected Genres: {search.selectedGenres.join('|')}</b>
                                <br/>
                                <b>Release Year: {search.releaseYear}</b>
                                <br/>
                                <b>Language: {search.language}</b>
                                <Row>
                                    <p>
                                        <Button onClick={() => deleteSearch(index)}>Delete Search</Button>
                                        <Button onClick={() => handleSearchAgain(search)}>Search Again</Button>
                                    </p>
                                </Row>
                                <hr />
                            </div>
                        ))}
                    </div>
                )}
                {
                   !showSearchHistory && <SearchResults movies={movies} />
                }

            </Col>
        </Row>
    );
};

export default SearchComponent;
