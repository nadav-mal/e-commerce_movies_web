package hac.controllers;

import hac.beans.MovieItem;
import hac.beans.ShoppingCart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


//localhost:8080/cart/add
@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class ShoppingCartController {
    private ShoppingCart shoppingCart;

    @Autowired
    public ShoppingCartController(ShoppingCart shoppingCart) {
        this.shoppingCart = shoppingCart;
    }

    @GetMapping
    public ShoppingCart getCart() {
        return shoppingCart;
    }

    @PostMapping("/add")
    public void addItem(@RequestParam String movieName, @RequestParam int movieId) {
        System.out.println("In /cart/add");
        System.out.println("movie name:" + movieName);
        System.out.println(",movieID:" + movieId);
        shoppingCart.addToCart(movieName, movieId);
        System.out.println("SIZE: " + shoppingCart.getSize());
    }

    @PostMapping("/remove/{index}")
    public void removeItem(@PathVariable int index) {
        //shoppingCart.removeItem(index);
    }

    @PostMapping("/clear")
    public void clearCart() {
        //shoppingCart.clearCart();
    }
}
