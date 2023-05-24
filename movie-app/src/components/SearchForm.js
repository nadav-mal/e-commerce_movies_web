// SearchForm.js
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './Components.css'
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
                <Row>
                    <Col>
                        <label htmlFor="searchString" className="form-label">
                            Search:
                        </label>
                        <input
                            type="text"
                            id="searchString"
                            value={searchString}
                            onChange={handleSearchStringChange}
                            className="form-control"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label htmlFor="genres" className="form-label">
                            Genres, Hold CTRL(windows) or Command(Mac) button to select multiple genres
                        </label>
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
                <Row>
                    <Col>
                        <label htmlFor="releaseYear" className="form-label">
                            Release Year:
                        </label>
                        <input
                            type="text"
                            id="releaseYear"
                            value={releaseYear}
                            onChange={handleReleaseYearChange}
                            className="form-control"
                        />
                    </Col>
                </Row>
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
