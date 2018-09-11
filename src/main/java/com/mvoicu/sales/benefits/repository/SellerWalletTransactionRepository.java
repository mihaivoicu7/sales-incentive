package com.mvoicu.sales.benefits.repository;

import com.mvoicu.sales.benefits.domain.SellerWalletTransaction;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SellerWalletTransaction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SellerWalletTransactionRepository extends JpaRepository<SellerWalletTransaction, Long> {

}
