package hac.controllers;


import hac.beans.MovieItem;
import hac.beans.ShoppingCart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 The ShoppingCartController class handles HTTP requests related to the shopping cart.
 */
@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class ShoppingCartController {
    private final ShoppingCart shoppingCart;

    @Autowired
    public ShoppingCartController(ShoppingCart shoppingCart) {
        this.shoppingCart = shoppingCart;
    }

    /**
     Retrieves the shopping cart.
     @return The shopping cart.
     */
    @GetMapping
    public ShoppingCart getCart() {
        return shoppingCart;
    }
    /**
     Adds a movie item to the shopping cart.
     @param movieName The name of the movie.
     @param movieId The ID of the movie.
     @param posterPath The path to the movie's poster.
     @param releaseDate The release date of the movie.
     @param overview The overview of the movie.
     @return The size of the shopping cart after adding the movie item.
     */
    @PostMapping("/add")
    public int addItem(@RequestParam String movieName, @RequestParam int movieId, @RequestParam String posterPath, @RequestParam String releaseDate, @RequestParam String overview) {
        MovieItem item = new MovieItem(movieName, movieId, posterPath, overview, releaseDate);
        shoppingCart.add(item);
        return shoppingCart.getSize();
    }
    /**
     Removes a movie item from the shopping cart.
     @param movieId The ID of the movie to remove.
     */
    @PostMapping("/remove/{movieId}")
    public void removeItem(@PathVariable int movieId) {
        shoppingCart.removeItem(movieId);
    }
    /**
     Retrieves the size of the shopping cart.
     @return The size of the shopping cart.
     */
    @GetMapping("/size")
    public int getSize() {
        return shoppingCart.getSize();
    }
    /**
     Clears the shopping cart.
     */
    @PostMapping("/clear")
    public void clearCart() {
        shoppingCart.clearCart();
    }
}