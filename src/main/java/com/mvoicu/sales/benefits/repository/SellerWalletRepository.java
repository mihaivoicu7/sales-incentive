package com.mvoicu.sales.benefits.repository;

import com.mvoicu.sales.benefits.domain.SellerWallet;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SellerWallet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SellerWalletRepository extends JpaRepository<SellerWallet, Long> {

}
