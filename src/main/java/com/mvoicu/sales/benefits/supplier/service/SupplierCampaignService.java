package com.mvoicu.sales.benefits.supplier.service;

import com.mvoicu.sales.benefits.domain.Campaign;
import com.mvoicu.sales.benefits.repository.CampaignRepository;
import com.mvoicu.sales.benefits.security.SecurityUtils;
import com.mvoicu.sales.benefits.service.CampaignService;
import com.mvoicu.sales.benefits.service.SupplierService;
import com.mvoicu.sales.benefits.service.dto.CampaignDTO;
import com.mvoicu.sales.benefits.service.mapper.CampaignMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Campaign.
 */
@Service
@Transactional
public class SupplierCampaignService {

    private final Logger log = LoggerFactory.getLogger(SupplierCampaignService.class);

    private final CampaignRepository campaignRepository;

    private final CampaignMapper campaignMapper;

    private final SupplierService supplierService;

    public SupplierCampaignService(CampaignRepository campaignRepository, CampaignMapper campaignMapper, SupplierService supplierService) {
        this.campaignRepository = campaignRepository;
        this.campaignMapper = campaignMapper;
        this.supplierService = supplierService;
    }

    /**
     * Save a campaign.
     *
     * @param campaignDTO the entity to save
     * @return the persisted entity
     */
    public CampaignDTO save(CampaignDTO campaignDTO) {
        log.debug("Request to save Supplier Campaign : {}", campaignDTO);
        campaignDTO.setSupplierId(supplierService.findCurrentSupplier().get().getId());
        Campaign campaign = campaignMapper.toEntity(campaignDTO);
        campaign = campaignRepository.save(campaign);
        return campaignMapper.toDto(campaign);
    }

    /**
     * Get all the campaigns.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CampaignDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Supplier Campaigns");
        return campaignRepository.findAllBySupplierUserLogin(SecurityUtils.getCurrentUserLogin().get(), pageable)
            .map(campaignMapper::toDto);
    }


    /**
     * Get one campaign by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<CampaignDTO> findOne(Long id) {
        log.debug("Request to get Campaign : {}", id);
        return campaignRepository.findByIdAndSupplierUserLogin(id, SecurityUtils.getCurrentUserLogin().get())
            .map(campaignMapper::toDto);
    }

    /**
     * Delete the campaign by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Campaign : {}", id);
        campaignRepository.deleteByIdAndSupplierUserLogin(id, SecurityUtils.getCurrentUserLogin().get());
    }
}
