package com.mvoicu.sales.benefits.repository;

import com.mvoicu.sales.benefits.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findBySupplierUserLogin(String login, Pageable pageable);

    Optional<Product> findByIdAndSupplierUserLogin(Long id, String login);

    void deleteByIdAndSupplierUserLogin(Long id, String login);
}
