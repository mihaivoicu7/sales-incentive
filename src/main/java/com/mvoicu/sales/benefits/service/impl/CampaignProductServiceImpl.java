package com.mvoicu.sales.benefits.service.impl;

import com.mvoicu.sales.benefits.service.CampaignProductService;
import com.mvoicu.sales.benefits.domain.CampaignProduct;
import com.mvoicu.sales.benefits.repository.CampaignProductRepository;
import com.mvoicu.sales.benefits.service.dto.CampaignProductDTO;
import com.mvoicu.sales.benefits.service.mapper.CampaignProductMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing CampaignProduct.
 */
@Service
@Transactional
public class CampaignProductServiceImpl implements CampaignProductService {

    private final Logger log = LoggerFactory.getLogger(CampaignProductServiceImpl.class);

    private final CampaignProductRepository campaignProductRepository;

    private final CampaignProductMapper campaignProductMapper;

    public CampaignProductServiceImpl(CampaignProductRepository campaignProductRepository, CampaignProductMapper campaignProductMapper) {
        this.campaignProductRepository = campaignProductRepository;
        this.campaignProductMapper = campaignProductMapper;
    }

    /**
     * Save a campaignProduct.
     *
     * @param campaignProductDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CampaignProductDTO save(CampaignProductDTO campaignProductDTO) {
        log.debug("Request to save CampaignProduct : {}", campaignProductDTO);
        CampaignProduct campaignProduct = campaignProductMapper.toEntity(campaignProductDTO);
        campaignProduct = campaignProductRepository.save(campaignProduct);
        return campaignProductMapper.toDto(campaignProduct);
    }

    /**
     * Get all the campaignProducts.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CampaignProductDTO> findAll() {
        log.debug("Request to get all CampaignProducts");
        return campaignProductRepository.findAll().stream()
            .map(campaignProductMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one campaignProduct by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CampaignProductDTO> findOne(Long id) {
        log.debug("Request to get CampaignProduct : {}", id);
        return campaignProductRepository.findById(id)
            .map(campaignProductMapper::toDto);
    }

    /**
     * Delete the campaignProduct by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CampaignProduct : {}", id);
        campaignProductRepository.deleteById(id);
    }
}
