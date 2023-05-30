import React from "react";
import { Button, Row } from "react-bootstrap";

import { ACTION_TYPES } from "./ACTION_TYPES";

/**
 * A component that displays the search history and provides actions for managing it.
 * @param {Object} props - The component props.
 * @param {Object} props.state - The state object containing the search history.
 * @param {Function} props.dispatch - The dispatch function used to trigger state updates.
 * @returns {JSX.Element} The rendered SearchList component.
 */
const SearchList = ({ state, dispatch }) => {
    /**
     * Clears the search history.
     */
    const clearHistory = () => {
        dispatch({ type: ACTION_TYPES.CLEAR_HIST, payload: {} });
    };

    /**
     * Deletes a specific search entry from the search history.
     * @param {number} index - The index of the search entry to delete.
     */
    const deleteSearch = (index) => {
        dispatch({ type: ACTION_TYPES.DELETE_SEARCH, payload: { index: index } });
    };

    /**
     * Performs a search using the provided search entry.
     * @param {Object} search - The search entry to use for the search.
     */
    const handleSearchAgain = (search) => {
        dispatch({ type: ACTION_TYPES.SEARCH_AGAIN, payload: { searchEntry: search } });
    };

    return (
        <div>
            <h3>Search History</h3>
            <hr />
            {state.searchHistory.length && state.searchHistory.length > 0 ? (
                <Button className={'btn btn-danger'} onClick={clearHistory}>
                    Clear Search History
                </Button>
            ) : (
                <b> Search history is currently empty</b>
            )}

            {state.searchHistory.map((search, index) => (
                <div key={index}>
                    <p>
                        <strong>Search String:</strong> {search.searchString ? search.searchString : 'Empty parameter'}
                    </p>
                    <br />
                    <p>
                        <strong>Selected Genres:</strong>{' '}
                        {search.selectedGenres ? search.selectedGenres.join('|') : 'Empty parameter'}
                    </p>
                    <br />
                    <p>
                        <strong>Release Year:</strong> {search.releaseYear ? search.releaseYear : 'Empty parameter'}
                    </p>
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
    );
};

export default SearchList;
