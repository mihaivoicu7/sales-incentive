package com.mvoicu.sales.benefits.repository;

import com.mvoicu.sales.benefits.domain.SellerTransaction;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SellerTransaction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SellerTransactionRepository extends JpaRepository<SellerTransaction, Long> {

}
