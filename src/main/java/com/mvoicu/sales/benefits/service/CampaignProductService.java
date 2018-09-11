package com.mvoicu.sales.benefits.service;

import com.mvoicu.sales.benefits.service.dto.CampaignProductDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing CampaignProduct.
 */
public interface CampaignProductService {

    /**
     * Save a campaignProduct.
     *
     * @param campaignProductDTO the entity to save
     * @return the persisted entity
     */
    CampaignProductDTO save(CampaignProductDTO campaignProductDTO);

    /**
     * Get all the campaignProducts.
     *
     * @return the list of entities
     */
    List<CampaignProductDTO> findAll();


    /**
     * Get the "id" campaignProduct.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CampaignProductDTO> findOne(Long id);

    /**
     * Delete the "id" campaignProduct.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
