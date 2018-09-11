package com.mvoicu.sales.benefits.service;

import com.mvoicu.sales.benefits.service.dto.SellerDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Seller.
 */
public interface SellerService {

    /**
     * Save a seller.
     *
     * @param sellerDTO the entity to save
     * @return the persisted entity
     */
    SellerDTO save(SellerDTO sellerDTO);

    /**
     * Get all the sellers.
     *
     * @return the list of entities
     */
    List<SellerDTO> findAll();


    /**
     * Get the "id" seller.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<SellerDTO> findOne(Long id);

    /**
     * Delete the "id" seller.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
