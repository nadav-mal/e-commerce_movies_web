// SearchForm.js
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import '../utils/Components.css'

import {genreSelectText} from "../../consts/consts";
import FormInputRow from "./FormInputRow";
const SearchForm = ({
                        searchString,
                        handleSearchStringChange,
                        selectedGenres,
                        handleGenreChange,
                        genres,
                        releaseYear,
                        handleReleaseYearChange,
                        handleSearch,
                    }) => {
    return (
            <form onSubmit={handleSearch}>
                <FormInputRow labelForText="searchString"
                              labelTxt="Search:"
                              onChangeHandler={handleSearchStringChange}
                              valueState={searchString}/>
                <Row>
                    <Col>
                        <label htmlFor="genres" className="form-label">{genreSelectText}</label>
                        <select
                            id="genres"
                            multiple
                            onChange={handleGenreChange}
                            value={selectedGenres.map((genre) => genre.id)}
                            className="form-select"
                        >
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </Col>
                </Row>
                <FormInputRow labelForText="releaseYear"
                              labelTxt="Release Year:"
                              onChangeHandler={handleReleaseYearChange}
                              valueState={releaseYear}/>
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
