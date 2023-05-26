package hac.controllers;

import hac.repo.Purchase;
import hac.repo.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * This code is for debugging purposes only.
 * You can check the DB contents by visiting http://localhost:8080/debug/purchases
 * You may add new routes to this controller if you want to test your code.
 * This class will not be graded (ignored by the grader).
 */
@RestController
@RequestMapping("/purchase")
@CrossOrigin(origins = "http://localhost:3000")
public class PurchaseController {
    @Autowired
    private PurchaseRepository repository;  // this is the JPA repository (SQL database)

    @GetMapping("/purchases")
    public List<Purchase> showPurchases() {
        System.out.println("OUT HERE!!");
        return repository.findAll(); // this is a JPA method to get all the purchases
    }

    @PostMapping("/purchases")
    public Purchase addPurchase(Purchase purchase){
        System.out.println("In POST");
        return repository.save(purchase);
    }

    //@PostMapping("/addToCart")

}
