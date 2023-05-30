package hac.repo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email; // FIX!!!!
import jakarta.validation.constraints.NotEmpty; // FIX!!!!
import jakarta.validation.constraints.PositiveOrZero; // FIX!!!!
import java.io.Serializable;

/**

 The Purchase class represents a record of a user buying a product.

 It stores information such as the user's first name, last name, email, and payment amount.
 */
@Entity
public class Purchase implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "First name is mandatory")
    private String firstName;

    @NotEmpty(message = "Last name is mandatory")
    private String lastName;

    @NotEmpty(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    private String email;

    @PositiveOrZero(message = "Payment must be positive or zero")
    private Double payment = 0.0;

    /**
     Constructs a Purchase object with the specified email, payment amount, first name, and last name.
     @param email The email of the user making the purchase.
     @param total The payment amount of the purchase.
     @param firstName The first name of the user making the purchase.
     @param lastName The last name of the user making the purchase.
     */
    public Purchase(String email, Double total, String firstName, String lastName) {
        this.email = email;
        this.payment = total;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    /**
     Default constructor for the Purchase class.
     */
    public Purchase() {
    }

    /**
     Returns the ID of the purchase.
     @return The ID of the purchase.
     */
    public Long getId() {
        return id;
    }
    /**
     Returns the first name of the user making the purchase.
     @return The first name of the user making the purchase.
     */
    public String getFirstName() {
        return firstName;
    }
    /**
     Returns the last name of the user making the purchase.
     @return The last name of the user making the purchase.
     */
    public String getLastName() {
        return lastName;
    }
    /**
     Returns the payment amount of the purchase.
     @return The payment amount of the purchase.
     */
    public Double getPayment() {
        return payment;
    }
    /**
     Returns the email of the user making the purchase.
     @return The email of the user making the purchase.
     */
    public String getEmail() {
        return email;
    }
    /**
     Sets the ID of the purchase.
     @param id The ID to set for the purchase.
     */
    public void setId(Long id) {
        this.id = id;
    }
    /**
     Sets the first name of the user making the purchase.
     @param firstName The first name to set for the user.
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    /**
     Sets the last name of the user making the purchase.
     @param lastName The last name to set for the user.
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    /**
     Sets the payment amount of the purchase.
     @param payment The payment amount to set for the purchase.
     */
    public void setPayment(Double payment) {
        this.payment = payment;
    }
    /**
     Sets the email of the user making the purchase.
     @param email The email to set for the user.
     */
    public void setEmail(String email) {
        this.email = email;
    }
}