package com.mvoicu.sales.benefits.service;

import com.mvoicu.sales.benefits.service.dto.SellerTransactionDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing SellerTransaction.
 */
public interface SellerTransactionService {

    /**
     * Save a sellerTransaction.
     *
     * @param sellerTransactionDTO the entity to save
     * @return the persisted entity
     */
    SellerTransactionDTO save(SellerTransactionDTO sellerTransactionDTO);

    /**
     * Get all the sellerTransactions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<SellerTransactionDTO> findAll(Pageable pageable);


    /**
     * Get the "id" sellerTransaction.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<SellerTransactionDTO> findOne(Long id);

    /**
     * Delete the "id" sellerTransaction.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
