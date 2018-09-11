package com.mvoicu.sales.benefits.service.impl;

import com.mvoicu.sales.benefits.service.SellerService;
import com.mvoicu.sales.benefits.domain.Seller;
import com.mvoicu.sales.benefits.repository.SellerRepository;
import com.mvoicu.sales.benefits.service.dto.SellerDTO;
import com.mvoicu.sales.benefits.service.mapper.SellerMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing Seller.
 */
@Service
@Transactional
public class SellerServiceImpl implements SellerService {

    private final Logger log = LoggerFactory.getLogger(SellerServiceImpl.class);

    private final SellerRepository sellerRepository;

    private final SellerMapper sellerMapper;

    public SellerServiceImpl(SellerRepository sellerRepository, SellerMapper sellerMapper) {
        this.sellerRepository = sellerRepository;
        this.sellerMapper = sellerMapper;
    }

    /**
     * Save a seller.
     *
     * @param sellerDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SellerDTO save(SellerDTO sellerDTO) {
        log.debug("Request to save Seller : {}", sellerDTO);
        Seller seller = sellerMapper.toEntity(sellerDTO);
        seller = sellerRepository.save(seller);
        return sellerMapper.toDto(seller);
    }

    /**
     * Get all the sellers.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SellerDTO> findAll() {
        log.debug("Request to get all Sellers");
        return sellerRepository.findAll().stream()
            .map(sellerMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one seller by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SellerDTO> findOne(Long id) {
        log.debug("Request to get Seller : {}", id);
        return sellerRepository.findById(id)
            .map(sellerMapper::toDto);
    }

    /**
     * Delete the seller by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Seller : {}", id);
        sellerRepository.deleteById(id);
    }
}
