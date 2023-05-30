package hac;

import hac.repo.Purchase;
import hac.repo.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

/**
 The DebugController class is used for debugging purposes only.
 It provides endpoints to check and modify the contents of the database.
 This class is not graded and can be used to test your code.
 */
@RestController
@RequestMapping("/debug")
public class DebugController {
    @Autowired
    private PurchaseRepository repository; // JPA repository for SQL database

    /**
     Retrieves all the purchases from the database.
     @return A list of all the purchases in the database.
     */
    @GetMapping("/purchases")
    public List<Purchase> showPurchases() {
        System.out.println("OUT HERE!!");
        return repository.findAll(); // Retrieves all the purchases using JPA
    }
    /**
     Adds a new purchase to the database.
     @param purchase The purchase to be added.
     @return The saved purchase.
     */
    @PostMapping("/purchases")
    public Purchase addPurchase(Purchase purchase) {
        System.out.println("In POST");
        return repository.save(purchase); // Saves the purchase to the database using JPA
    }
}