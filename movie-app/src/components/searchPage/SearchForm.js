import React from 'react';
import { Row, Col } from 'react-bootstrap';
import '../utils/Components.css'

import { genreSelectText } from "../../consts/consts";
import FormInputRow from "./FormInputRow";

/**
 * A component that displays a search form with input fields for search criteria.
 * @param {Object} props - The component props.
 * @param {Object} props.state - The state object containing the form values.
 * @param {Function} props.handleChange - The function to handle changes in the form inputs.
 * @param {Function} props.handleSearch - The function to handle the form submission and initiate a search.
 * @param {Function} props.addGenre - The function to add a genre to the selected genres list.
 * @returns {JSX.Element} The rendered SearchForm component.
 */
const SearchForm = ({
                        state,
                        handleChange,
                        handleSearch,
                        addGenre
                    }) => {
    /**
     * Returns an array of selected genre IDs.
     * @returns {Array} An array of selected genre IDs.
     */
    const getSelectedGenresValue = () => {
        return state.selectedGenres ? state.selectedGenres.map((genre) => genre.id) : '';
    }

    return (
        <form onSubmit={handleSearch}>
            <FormInputRow
                labelForText="searchString"
                labelTxt="Search:"
                onChangeHandler={handleChange}
                valueState={state.searchString}
            />
            <Row>
                <Col>
                    <label htmlFor="genres" className="form-label">{genreSelectText}</label>
                    <select
                        name="genres"
                        id="genres"
                        multiple
                        value={getSelectedGenresValue()}
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
            <FormInputRow
                labelForText="releaseYear"
                labelTxt="Release Year:"
                onChangeHandler={handleChange}
                valueState={state.releaseYear}
            />
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
