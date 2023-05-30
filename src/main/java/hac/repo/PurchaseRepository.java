package hac.repo;

import org.springframework.data.jpa.repository.JpaRepository;

/**

 The PurchaseRepository interface extends the JpaRepository interface to provide CRUD operations for the Purchase entity.
 It allows accessing and manipulating the Purchase data in the database.
 */
public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
}
