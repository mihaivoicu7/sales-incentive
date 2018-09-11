package com.mvoicu.sales.benefits.service;

import com.mvoicu.sales.benefits.service.dto.SellerWalletDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing SellerWallet.
 */
public interface SellerWalletService {

    /**
     * Save a sellerWallet.
     *
     * @param sellerWalletDTO the entity to save
     * @return the persisted entity
     */
    SellerWalletDTO save(SellerWalletDTO sellerWalletDTO);

    /**
     * Get all the sellerWallets.
     *
     * @return the list of entities
     */
    List<SellerWalletDTO> findAll();


    /**
     * Get the "id" sellerWallet.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<SellerWalletDTO> findOne(Long id);

    /**
     * Delete the "id" sellerWallet.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
