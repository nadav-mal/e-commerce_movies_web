import React from 'react';

const Cart = ({ cart, removeFromCart, emptyCart }) => {
    const getTotalPrice = () => {
        const totalPrice = cart.reduce((total, movie) => total + 3.99, 0);
        return totalPrice.toFixed(2);
    };

    return (
        <div>
            <h2>Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty. Go shop for products!</p>
            ) : (
                <div>
                    {cart.map((movie) => (
                        <div key={movie.id}>
                            <img src={movie.image} alt={movie.title} />
                            <h3>{movie.title}</h3>
                            <p>Release Date: {movie.releaseDate}</p>
                            <p>Price: $3.99</p>
                            <button onClick={() => removeFromCart(movie)}>Remove</button>
                        </div>
                    ))}
                    <p>Total Price: ${getTotalPrice()}</p>
                    <button onClick={emptyCart}>Empty Cart</button>
                </div>
            )}
        </div>
    );
};

export default Cart;
