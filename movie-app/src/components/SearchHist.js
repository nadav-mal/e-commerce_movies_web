import {Button, Row} from "react-bootstrap";
import React from "react";


const SearchHist = (searchHistory, deleteSearch,handleSearchAgain) =>{
    console.log(searchHistory)
    if(!searchHistory.length) //Handling a first rendering error caused by mapping an empty array
        return;
    return(
        <div>
            <h3>Search History</h3>
            <hr/>
            {searchHistory.map((search, index) => (
                <div key={index}>
                    <b>Search String:  {search.searchString}</b>
                    <br/>
                    <b>Selected Genres: {search.selectedGenres.join('|')}</b>
                    <br/>
                    <b>Release Year: {search.releaseYear}</b>
                    <br/>
                    <b>Language: {search.language}</b>
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
    )
}
export default SearchHist;