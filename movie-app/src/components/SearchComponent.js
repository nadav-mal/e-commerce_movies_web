import React, { useState, useEffect } from 'react';
import Title from './Title'

import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import  * as consts from '../consts/consts'
const SearchComponent = () => {
    const [searchString, setSearchString] = useState('');
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [releaseYear, setReleaseYear] = useState('');
    const [movies, setMovies] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    const [showSearchHistory, setShowSearchHistory] = useState(false);
    const [cartSize, setCartSize] = useState(0);
    const genresMap= new Map();
//input_value -> onchange -> submit takes the input_value and inserts it into "submit value"
 //useEffect -> submit value dependencies, useEffect will trigger the submitValue and so on and so forth
    useEffect(() => {
        getGenres();
        getCartSize();
    }, []);

    const getGenres = () =>{
        axios.get(consts.genresUrl, {
            params: { api_key: consts.apiKey, },
        })
            .then((response) => {
                setGenres(response.data.genres);
            })
            .catch((error) => {
                console.error(consts.errorMessagePrefix + consts.genresErrorMessagePostfix, error);
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
        const getCartSizeURL = consts.serverCartAPI+ '/size';
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


    const addToSearchHistory = () => {
        const isSearchAlreadyExists = searchHistory.some((entry) => {
            // Compare the searchString, selectedGenres, releaseYear
            return (
                entry.searchString === searchString &&
                entry.releaseYear === releaseYear &&
                    entry.selectedGenres === selectedGenres
            );
        });
        if( searchString === '' && releaseYear === '' && (!selectedGenres.length))
            return;
        if(!isSearchAlreadyExists) {
            selectedGenres.forEach((genre) => {
                genresMap.set(genre.name, genre.id);
            });

            const genreNames = selectedGenres.map((genre) => `${genre.name}`);

            const searchEntry = {
                searchString: searchString,
                selectedGenres: genreNames,
                releaseYear: releaseYear,
            };
            setSearchHistory((prevHistory) => [...prevHistory, searchEntry]);
            setSelectedGenres([]);
        }
    };
    const handleSearchAgain = (search) => {
        setSearchString(search.searchString);
        setSelectedGenres(search.selectedGenres);
        setReleaseYear(search.releaseYear);
        setShowSearchHistory(false);
    };

    const fetchMovies = async () => {
        try {
            const requestInfo = getPathAndConfigure();
            const response = await axios.get(requestInfo.url, { params: requestInfo.params });
            setMovies(response.data.results);
        } catch (error) {
            console.error(consts.errorMessagePrefix + consts.moviesErrorMessagePostfix, error);
        }
    };

    const handleButtonClick = (search) => {
        handleSearchAgain(search);
        //fetchMovies();
        //UseEffect should trigger fetch movies after we separate the logic between both search / search again
     };


    const getPathAndConfigure = () => {
        const params = {
            api_key: consts.apiKey,
            with_genres: selectedGenres.map((genre) => genre.id).join(','),
            primary_release_year: releaseYear,
            include_adult: false,
        };
        console.log(searchString);

        let url = consts.urlPrefix;
        if(searchString !== '') {
            params.query = searchString;
            url += consts.urlSearchPostfix;
        } else {
            url += consts.urlDiscoverPostfix;
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
                    <Button className="search-button" href={'/cart'}> {cartSize} Items. Click here to go to cart.</Button>
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
                    <Button className="search-button" onClick={() => setShowSearchHistory(!showSearchHistory)}>
                        Show Search History
                    </Button>
                </div>
                { showSearchHistory && (
                    <div>
                        <h3>Search History</h3>
                        <hr/>
                        {
                            (searchHistory.length && searchHistory.length >0) ?
                                <Button className={'btn btn-danger'} onClick={clearHistory}>Clear Search History</Button>
                                :
                                <b> Search history is currently empty</b>
                        }

                        {searchHistory.map((search, index) => (
                            <div key={index}>
                                <p> <strong>Search String:</strong>  {search.searchString ? search.searchString : 'Empty parameter'}</p>
                                <br/>
                                <p> <strong>Selected Genres:</strong> {search.selectedGenres ? search.selectedGenres.join('|') : 'Empty parameter'}</p>
                                <br/>
                                <p> <strong> Release Year:</strong> {search.releaseYear ? search.releaseYear : 'Empty parameter'}</p>
                                <Row>
                                    <p>
                                        <Button onClick={() => deleteSearch(index)}>Delete Search</Button>
                                        <Button onClick={() => handleButtonClick(search)}>Search Again</Button>
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
