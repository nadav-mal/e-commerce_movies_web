import React, { useState, useEffect, useReducer } from 'react';
import Title from '../utils/Title'
import { ACTION_TYPES } from "./ACTION_TYPES";
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import * as consts from '../../consts/consts'
import SearchList from "./SearchList";
import CartNavigator from './CartNavigator'
import searchReducer, { INITIAL_STATE } from './searchReducer'

/**
 * A component that allows users to search for movies based on criteria and displays search results.
 * @returns {JSX.Element} The rendered SearchComponent.
 */
const SearchComponent = () => {
    const [state, dispatch] = useReducer(searchReducer, INITIAL_STATE);
    const [movies, setMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        getGenres();
        getCartSize();
    }, []);

    useEffect(() => {
        fetchMovies();
    }, [state.submitValue])

    /**
     * Fetches the genre list from the server and updates the state.
     */
    const getGenres = () => {
        axios.get(consts.genresUrl, {
            params: { api_key: consts.apiKey },
        })
            .then((response) => {
                dispatch({ type: ACTION_TYPES.CHANGE_INPUT, payload: { name: "genres", value: response.data.genres } });
            })
            .catch((error) => {
                handleError("Fetching genres list failed. " + error.message);
            });
    }

    /**
     * Handles changes in the form inputs and updates the state accordingly.
     * @param {Object} e - The event object.
     */
    const handleChange = (e) => {
        dispatch({ type: ACTION_TYPES.CHANGE_INPUT, payload: { name: e.target.name, value: e.target.value } });
    }

    /**
     * Fetches the size of the cart from the server and updates the state.
     */
    const getCartSize = () => {
        const getCartSizeURL = consts.serverCartAPI + '/size';
        axios.get(getCartSizeURL)
            .then(response => {
                if (response.data < 0)
                    throw new Error("An internal server error")
                dispatch({ type: ACTION_TYPES.CHANGE_INPUT, payload: { name: "cartSize", value: response.data } });
            }).catch((e) => {
            handleError("Fetching cart failed.  " + e.message);
        })
    };

    /**
     * Adds a genre to the selected genres list.
     * @param {Object} e - The event object.
     */
    const addGenre = (e) => {
        const selectedGenreIds = Array.from(e.target.selectedOptions, (option) =>
            parseInt(option.value));
        let selectedGenres = [];
        state.genres.forEach(genre => {
            if (selectedGenreIds.includes(genre.id)) {
                selectedGenres = [...selectedGenres, genre];
            }
        })
        dispatch({ type: ACTION_TYPES.CHANGE_INPUT, payload: { name: "selectedGenres", value: selectedGenres } });
    }

    /**
     * Handles the form submission and initiates a search.
     * @param {Object} event - The event object.
     */
    const handleSearch = (event) => {
        event.preventDefault();
        dispatch({ type: ACTION_TYPES.SEARCH, payload: {} });
        fetchMovies();
    };

    /**
     * Fetches the movies from the server based on the search criteria and updates the state.
     */
    const fetchMovies = async () => {
        try {
            const requestInfo = getPathAndConfigure();
            const response = await axios.get(requestInfo.url, { params: requestInfo.params });
            setMovies(response.data.results);
        } catch (error) {
            handleError("Fetching movies failed. " + error.message);
        }
    };

    /**
     * Handles errors and displays an error message.
     * @param {string} msg - The error message.
     */
    const handleError = (msg) => {
        setShowError(true);
        setErrorMessage(msg);
        setTimeout(() => {
            setShowError(false);
            setErrorMessage('');
        }, 5000);
    }

    /**
     * Constructs the URL and query parameters for the movie search.
     * @returns {Object} The URL and query parameters.
     */
    const getPathAndConfigure = () => {
        const params = {
            api_key: consts.apiKey,
            with_genres: state.selectedGenres.map((genre) => genre.id).join(','),
            primary_release_year: state.releaseYear,
            include_adult: false,
        };
        let url = consts.urlPrefix;
        if (state.submitValue !== '') {
            params.query = state.submitValue;
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
            <Title />
            {showError && <Button className={'btn btn-danger'}> {errorMessage} </Button>}
            <CartNavigator cartSize={state.cartSize} />
            <Row>
                <Col className={'col-md-12'}>
                    <SearchForm
                        state={state}
                        handleChange={handleChange}
                        handleSearch={handleSearch}
                        addGenre={addGenre}
                    />
                </Col>
                <Col className={'col-md-12'}>
                    <div>
                        <Button className="search-button" onClick={() => dispatch({ type: ACTION_TYPES.TOGGLE_SEARCH_HIST, payload: {} })}>
                            Show Search History
                        </Button>
                    </div>
                    {state.showSearchHistory && (
                        <SearchList
                            state={state}
                            dispatch={dispatch}
                        />
                    )}
                    {!state.showSearchHistory && <SearchResults movies={movies} dispatch={dispatch} />}
                </Col>
            </Row>
        </>
    );
};

export default SearchComponent;
