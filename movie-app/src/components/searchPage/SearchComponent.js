import React, { useState, useEffect, useReducer } from 'react';
import Title from '../utils/Title'
import {ACTION_TYPES} from "./ACTION_TYPES";
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import  * as consts from '../../consts/consts'
import SearchList from "./SearchList";
import CartNavigator from './CartNavigator'
import searchReducer, {INITAL_STATE} from './searchReducer'
const SearchComponent = () => {
    const [state, dispatch] = useReducer(searchReducer, INITAL_STATE);
    const [movies, setMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [showError,setShowError] = useState(false);

    useEffect(() => {
        getGenres();
        getCartSize();
    }, []);

    useEffect(() => {
        fetchMovies();
    },[state.submitValue])

    const getGenres = () =>{
        axios.get(consts.genresUrl, {
            params: { api_key: consts.apiKey, },
        })
            .then((response) => {
                dispatch({type:ACTION_TYPES.CHANGE_INPUT, payload:{name:"genres", value: response.data.genres}});

            })
            .catch((error) => {
                handleError("Fetching genres list failed. " + error.message);
            });
    }
    const handleChange = e =>{
        dispatch({type:ACTION_TYPES.CHANGE_INPUT, payload:{name: e.target.name, value: e.target.value}});
    }
    const getCartSize = () =>{
        const getCartSizeURL = consts.serverCartAPI+ '/size';
        axios.get(getCartSizeURL)
            .then(response =>{
                if(response.data < 0)
                    throw new Error("An internal server error")
                dispatch({type:ACTION_TYPES.CHANGE_INPUT, payload:{name: "cartSize", value: response.data}});
            }).catch((e)=>{
            handleError("Fetching cart failed.  " +e.message);
        })
    };
    const addGenre = (e) =>{
        const selectedGenreIds = Array.from(e.target.selectedOptions, (option) =>
            parseInt(option.value));
        let selectedGenres= [];
        state.genres.forEach(genre=>{
            if(selectedGenreIds.includes(genre.id)){
                console.log("here!");
                selectedGenres = [...selectedGenres, genre];
            }
        })
        dispatch({type:ACTION_TYPES.CHANGE_INPUT, payload:{name: "selectedGenres", value: selectedGenres}});
    }

    const handleSearch = (event) => {
        event.preventDefault();
        dispatch({type:ACTION_TYPES.SEARCH, payload:{}});
        fetchMovies();
    };

    const fetchMovies = async () => {
        try {
            const requestInfo = getPathAndConfigure();
            const response = await axios.get(requestInfo.url, { params: requestInfo.params });
            setMovies(response.data.results);
        } catch (error) {
            handleError("Fetching movies failed.  " + +error.message);
        }
    };

    const handleError = (msg) =>{
        setShowError(true);
        setErrorMessage(msg);
        setTimeout(() => {
            setShowError(false);
            setErrorMessage('');
        }, 5000);
    }
    const getPathAndConfigure = () => {
        const params = {
            api_key: consts.apiKey,
            with_genres: state.selectedGenres.map((genre) => genre.id).join(','),
            primary_release_year: state.releaseYear,
            include_adult: false,
        };
        let url = consts.urlPrefix;
        if( state.submitValue !== '') {
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
            <Title/>
            {showError && <Button className={'btn btn-danger'}> {errorMessage} </Button> }
            <CartNavigator cartSize={state.cartSize}/>
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
                    <Button className="search-button" onClick={() => dispatch({type:ACTION_TYPES.TOGGLE_SEARCH_HIST, payload:{}})}>
                        Show Search History
                    </Button>
                </div>
                { state.showSearchHistory && (
                    <SearchList
                    state={state}
                    dispatch={dispatch}
                    />
                )}
                {
                   !state.showSearchHistory && <SearchResults movies={movies} dispatch={dispatch}/>
                }
            </Col>
        </Row>
        </>
    );
};

export default SearchComponent;
