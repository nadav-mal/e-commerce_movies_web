import React from 'react';
import {Row, Col, Image} from 'react-bootstrap';
import * as consts from "../../consts/consts";

const CartItem = ({movie,index,handleImageClick,handleRemoveFromCart}) => {
    return (
        <div key={index} className="cart-item">
            <Row>
                <Col className={'col-sm-12 col-md-3 d-none d-sm-block'}>
                    <Image
                        src={`${consts.baseImageUrl}w200${movie.posterPath}`}
                        onClick={() => handleImageClick(`${consts.baseImageUrl}original${movie.posterPath}`)}
                        className="clickable-image"
                    />
                </Col>
                <Col className={'col-sm-12 col-md-7'}>
                    <h3>{movie.movieName}</h3>
                    <p>
                        <strong>Release Date:</strong> {movie.releaseDate}
                    </p>
                    <p>
                        <strong>Price: </strong> $3.99
                    </p>
                    <hr />
                    <b>Overview:</b>
                    <p>{movie.overview}</p>
                </Col>
                <Col className={'col-sm-3 col-md-2'}>
                    <button className={'btn btn-danger'} onClick={()=> handleRemoveFromCart(movie.movieId)}>
                        Remove from cart
                    </button>
                </Col>
            </Row>
        </div>
    )
};
export default CartItem;