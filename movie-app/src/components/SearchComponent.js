import React, { useState, useEffect } from 'react';
import Title from './Title'

import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
const SearchComponent = () => {
    const [searchString, setSearchString] = useState('');
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [releaseYear, setReleaseYear] = useState('');
    const [movies, setMovies] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    const [showSearchHistory, setShowSearchHistory] = useState(false);
    const [cartSize, setCartSize] = useState(0);

    const genresUrl = 'https://api.themoviedb.org/3/genre/movie/list';
    const apiKey = 'b91b712834ebca8f1c0c1e009c6276b6';
    const urlPrefix = 'https://api.themoviedb.org/3/';
    const urlSearchPostfix = 'search/movie';
    const urlDiscoverPostfix = 'discover/movie';
    const errorMessagePrefix = "Error fetching ";
    const genresErrorMessagePostfix = 'genres:';
    const moviesErrorMessagePostfix = 'movies:';

    const genresMap= new Map();

    useEffect(() => {
        getGenres();
        getCartSize();
    }, []);
    const getGenres = () =>{
        axios.get(genresUrl, {
            params: { api_key: apiKey, },
        })
            .then((response) => {
                setGenres(response.data.genres);
            })
            .catch((error) => {
                console.error(errorMessagePrefix + genresErrorMessagePostfix, error);
            });
    }
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
    const getCartSize = () =>{
        const getCartSizeURL = 'http://localhost:8080/cart/size';
        axios.get(getCartSizeURL)
            .then(response =>{
                setCartSize(response.data);
            }).catch(()=>{
        })
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
        fetchMovies();
    };

    const addToSearchHistory = () => {
        const isSearchAlreadyExists = searchHistory.some((entry) => {
            // Compare the searchString, selectedGenres, releaseYear
            return (
                entry.searchString === searchString &&
                entry.releaseYear === releaseYear
            );
        });
        if( searchString === '' && releaseYear === '' && (!selectedGenres.length))
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
            };
            setSearchHistory((prevHistory) => [...prevHistory, searchEntry]);
            setSelectedGenres([]);
        }
    };

    const fetchMovies = async () => {
        try {
            const requestInfo =  getPathAndConfigure();
            const response = await axios.get(
                requestInfo.url, { params: requestInfo.params, }
            );
            setMovies(response.data.results);
        } catch (error) {
            console.error(errorMessagePrefix + moviesErrorMessagePostfix, error);
        }
    };

    const getPathAndConfigure = () => {
        const params = {
            api_key: apiKey,
            with_genres: selectedGenres.map((genre) => genre.id).join(','),
            primary_release_year: releaseYear,
            include_adult: false,
        };

        let url = urlPrefix;
        if(searchString !== '') {
            params.query = searchString;
            url += urlSearchPostfix;
        } else {
            url += urlDiscoverPostfix;
        }
        return {
            url: url,
            params: params,
        }
    }

    const clearHistory = () =>{
        setSearchHistory([]);
    }
    const deleteSearch = (index) => {
        setSearchHistory((prevHistory) => {
            const updatedHistory = [...prevHistory];
            updatedHistory.splice(index, 1);
            return updatedHistory;
        });
    };

    return (
        <>
            <Title/>
            <Row>
                <Col className="col-md-12" style={{ backgroundColor: '#f8f9fa', padding: '10px' }}>
                    <Button href={'/cart'}> {cartSize} Items. Click here to go to cart.</Button>
                </Col>
            </Row>
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
                        <Button className={'btn btn-danger'} onClick={clearHistory}>Clear Search History</Button>
                        {searchHistory.map((search, index) => (
                            <div key={index}>
                                <b>Search String:  {search.searchString}</b>
                                <br/>
                                <b>Selected Genres: {search.selectedGenres.join('|')}</b>
                                <br/>
                                <b>Release Year: {search.releaseYear}</b>
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
                   !showSearchHistory && <SearchResults movies={movies} setCartSize={setCartSize}/>
                }
            </Col>
        </Row>
        </>
    );
};

export default SearchComponent;
