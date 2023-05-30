package hac.controllers;

import hac.repo.Purchase;
import hac.repo.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 The PurchaseController class handles HTTP requests related to purchases.
 */
@RestController
@RequestMapping("/purchase")
@CrossOrigin(origins = "http://localhost:3000")
public class PurchaseController {
    @Autowired
    private PurchaseRepository repository; // JPA repository for SQL database

    /**
     Retrieves all the purchases from the database.
     @return A list of all the purchases in the database.
     */
    @GetMapping("/purchases")
    public List<Purchase> showPurchases() {
        return repository.findAll(); // Retrieves all the purchases using JPA
    }
    /**
     Adds a new purchase to the database.
     @param purchase The purchase to be added.
     @return The saved purchase.
     */
    @PostMapping("/purchases")
    public Purchase addPurchase(Purchase purchase) {
        return repository.save(purchase); // Saves the purchase to the database using JPA
    }
}