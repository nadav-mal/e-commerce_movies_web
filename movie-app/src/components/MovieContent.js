import React from "react";
import {Button, Row} from "react-bootstrap";

const MovieContent = ({searchHistory,setSearchHistory,handleSearchAgain}) =>{

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
    const doSearch = (search) =>{
        handleSearchAgain(search)
        handleSearchAgain(search)
    }

    return(<div>
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
                        <Button onClick={() => doSearch(search)}>Search Again</Button>
                    </p>
                </Row>
                <hr />
            </div>
        ))}
    </div>)
};
export default MovieContent;