package hac.beans;
import org.springframework.stereotype.Component;
import java.io.Serializable;
import java.util.ArrayList;

/**
 The ShoppingCart class represents a shopping cart for movie items.
 It is a bean class that is instantiated in session scope.
 */
@Component
public class ShoppingCart implements Serializable {
    private ArrayList<MovieItem> cart;

    /**
     Constructs a ShoppingCart object with an empty cart.
     */
    public ShoppingCart() {
        this.cart = new ArrayList<>();
    }
    /**
     Returns the list of movie items in the shopping cart.
     @return The list of movie items in the shopping cart.
     */
    public ArrayList<MovieItem> getCart() {
        return cart;
    }
    /**
     Sets the list of movie items in the shopping cart.
     @param cart The list of movie items to set in the shopping cart.
     */
    public void setCart(ArrayList<MovieItem> cart) {
        this.cart = cart;
    }
    /**
     Adds a movie item to the shopping cart if it doesn't already exist.
     @param movieItem The movie item to add to the shopping cart.
     */
    public void add(MovieItem movieItem) {
        boolean movieExists = cart.stream()
                .anyMatch(item -> item.getMovieId() == movieItem.getMovieId());

        if (!movieExists) {
            cart.add(movieItem);
        }
    }

    /**
     Removes a movie item from the shopping cart based on the movie ID.
     @param movieId The ID of the movie item to remove from the shopping cart.
     */
    public void removeItem(int movieId) {
        cart.removeIf(item -> item.getMovieId() == movieId);
    }
    /**
     Clears the shopping cart, removing all movie items.
     */
    public void clearCart() {
        cart.clear();
    }
    /**
     Returns the size of the shopping cart.
     @return The size of the shopping cart.
     */
    public int getSize() {
        return cart.size();
    }
}