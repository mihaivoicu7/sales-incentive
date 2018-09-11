package com.mvoicu.sales.benefits.service;

import com.mvoicu.sales.benefits.service.dto.SellerWalletTransactionDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing SellerWalletTransaction.
 */
public interface SellerWalletTransactionService {

    /**
     * Save a sellerWalletTransaction.
     *
     * @param sellerWalletTransactionDTO the entity to save
     * @return the persisted entity
     */
    SellerWalletTransactionDTO save(SellerWalletTransactionDTO sellerWalletTransactionDTO);

    /**
     * Get all the sellerWalletTransactions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<SellerWalletTransactionDTO> findAll(Pageable pageable);


    /**
     * Get the "id" sellerWalletTransaction.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<SellerWalletTransactionDTO> findOne(Long id);

    /**
     * Delete the "id" sellerWalletTransaction.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
