// SearchForm.js
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import '../utils/Components.css'

import {genreSelectText} from "../../consts/consts";
import FormInputRow from "./FormInputRow";
const SearchForm = ({
                        state,
                        handleChange,
                        handleSearch,
                        addGenre
                    }) => {
    const getSelectedGenresValue = () =>{

        return state.selectedGenres ? state.selectedGenres.map((genre) => genre.id) : '';
    }


    return (
            <form onSubmit={handleSearch}>
                <FormInputRow labelForText="searchString"
                              labelTxt="Search:"
                              onChangeHandler={handleChange}
                              valueState={state.searchString}/>
                <Row>
                    <Col>
                        <label htmlFor="genres" className="form-label">{genreSelectText}</label>
                        <select name="genres"
                            id="genres"
                            multiple
                            value={state.selectedGenres.map((genre) => genre.id)}
                            onChange={addGenre}
                            className="form-select"
                        >
                            {state.genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </Col>
                </Row>
                <FormInputRow labelForText="releaseYear"
                              labelTxt="Release Year:"
                              onChangeHandler={handleChange}
                              valueState={state.releaseYear}/>
                <Row>
                    <Col className={'col-3'}>
                        <button type="submit" className="search-button">
                            Search
                        </button>
                    </Col>
                </Row>
            </form>
    );
};

export default SearchForm;
