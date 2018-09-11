package com.mvoicu.sales.benefits.repository;

import com.mvoicu.sales.benefits.domain.Supplier;
import com.mvoicu.sales.benefits.domain.User;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the Supplier entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {

    public Supplier findByUser(User user);

    public Optional<Supplier> findByUserLogin(String login);

}
