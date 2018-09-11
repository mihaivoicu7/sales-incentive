package com.mvoicu.sales.benefits.service;

import com.mvoicu.sales.benefits.service.dto.SupplierDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Supplier.
 */
public interface SupplierService {

    /**
     * Save a supplier.
     *
     * @param supplierDTO the entity to save
     * @return the persisted entity
     */
    SupplierDTO save(SupplierDTO supplierDTO);

    /**
     * Get all the suppliers.
     *
     * @return the list of entities
     */
    List<SupplierDTO> findAll();


    /**
     * Get the "id" supplier.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<SupplierDTO> findOne(Long id);

    /**
     * Delete the "id" supplier.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    Optional<SupplierDTO> findCurrentSupplier();
}
