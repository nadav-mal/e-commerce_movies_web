import React, { useState, useEffect } from 'react';
import Title from '../utils/Title'

import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import  * as consts from '../../consts/consts'
import SearchList from "./SearchList";
import CartNavigator from './CartNavigator'
const SearchComponent = () => {
    const [searchString, setSearchString] = useState('');
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [releaseYear, setReleaseYear] = useState('');
    const [movies, setMovies] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    const [showSearchHistory, setShowSearchHistory] = useState(false);
    const [cartSize, setCartSize] = useState(0);
    const [submitValue,setSubmitValue] = useState('');
    const genresMap= new Map();


    useEffect(() => {
        getGenres();
        getCartSize();
    }, []);

    useEffect(() => {
        fetchMovies();
    },[submitValue])

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
        setSubmitValue(searchString);
        setShowSearchHistory(false)
        addToSearchHistory();
    };

    const handleSearchAgain = (search) => {
        setSubmitValue(search.searchString);
        setSelectedGenres(search.selectedGenres);
        setReleaseYear(search.releaseYear);
        setShowSearchHistory(false);
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
            return;//Not saving an empty search (it's stupid)
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


    const fetchMovies = async () => {
        try {
            const requestInfo = getPathAndConfigure();
            const response = await axios.get(requestInfo.url, { params: requestInfo.params });
            setMovies(response.data.results);
        } catch (error) {
            console.error(consts.errorMessagePrefix + consts.moviesErrorMessagePostfix, error);
        }
    };

    const getPathAndConfigure = () => {
        const params = {
            api_key: consts.apiKey,
            with_genres: selectedGenres.map((genre) => genre.id).join(','),
            primary_release_year: releaseYear,
            include_adult: false,
        };
        let url = consts.urlPrefix;
        if(submitValue !== '') {
            params.query = submitValue;
            url += consts.urlSearchPostfix;
        } else {
            url += consts.urlDiscoverPostfix;
        }
        return {
            url: url,
            params: params,
        }
    }

    return (
        <>
            <Title/>
            <CartNavigator cartSize={cartSize}/>
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
                    <SearchList searchHistory={searchHistory}
                                  setSearchHistory={setShowSearchHistory}
                                  handleSearchAgain={handleSearchAgain}/>
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
