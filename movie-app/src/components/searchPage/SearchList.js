import React from "react";
import {Button, Row} from "react-bootstrap";

import {ACTION_TYPES} from "./ACTION_TYPES";

const SearchList = ({state,dispatch}) =>{
    const clearHistory = () =>{
        dispatch({type:ACTION_TYPES.CLEAR_HIST, payload:{}});

    }
    const deleteSearch = (index) => {
        dispatch({type:ACTION_TYPES.DELETE_SEARCH, payload:{index: index}});
    };

    const handleSearchAgain = (search) => {
        dispatch({type:ACTION_TYPES.SEARCH_AGAIN, payload:{searchEntry: search}});
    };
    return(<div>
        <h3>Search History</h3>
        <hr/>
        {
            (state.searchHistory.length && state.searchHistory.length >0) ?
                <Button className={'btn btn-danger'} onClick={clearHistory}>Clear Search History</Button>
                :
                <b> Search history is currently empty</b>
        }

        {state.searchHistory.map((search, index) => (
            <div key={index}>
                <p> <strong>Search String:</strong>  {search.searchString ? search.searchString : 'Empty parameter'}</p>
                <br/>
                <p> <strong>Selected Genres:</strong> {search.selectedGenre ? search.selectedGenre : 'Empty parameter'}</p>
                <br/>
                <p> <strong> Release Year:</strong> {search.releaseYear ? search.releaseYear : 'Empty parameter'}</p>
                <Row>
                    <p>
                        <Button onClick={() => deleteSearch(index)}>Delete Search</Button>
                        <Button onClick={() => handleSearchAgain(search)}>Search Again</Button>
                    </p>
                </Row>
                <hr />
            </div>
        ))}
    </div>)
};
export default SearchList;