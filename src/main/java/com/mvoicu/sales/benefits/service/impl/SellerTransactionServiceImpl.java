package com.mvoicu.sales.benefits.service.impl;

import com.mvoicu.sales.benefits.service.SellerTransactionService;
import com.mvoicu.sales.benefits.domain.SellerTransaction;
import com.mvoicu.sales.benefits.repository.SellerTransactionRepository;
import com.mvoicu.sales.benefits.service.dto.SellerTransactionDTO;
import com.mvoicu.sales.benefits.service.mapper.SellerTransactionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing SellerTransaction.
 */
@Service
@Transactional
public class SellerTransactionServiceImpl implements SellerTransactionService {

    private final Logger log = LoggerFactory.getLogger(SellerTransactionServiceImpl.class);

    private final SellerTransactionRepository sellerTransactionRepository;

    private final SellerTransactionMapper sellerTransactionMapper;

    public SellerTransactionServiceImpl(SellerTransactionRepository sellerTransactionRepository, SellerTransactionMapper sellerTransactionMapper) {
        this.sellerTransactionRepository = sellerTransactionRepository;
        this.sellerTransactionMapper = sellerTransactionMapper;
    }

    /**
     * Save a sellerTransaction.
     *
     * @param sellerTransactionDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SellerTransactionDTO save(SellerTransactionDTO sellerTransactionDTO) {
        log.debug("Request to save SellerTransaction : {}", sellerTransactionDTO);
        SellerTransaction sellerTransaction = sellerTransactionMapper.toEntity(sellerTransactionDTO);
        sellerTransaction = sellerTransactionRepository.save(sellerTransaction);
        return sellerTransactionMapper.toDto(sellerTransaction);
    }

    /**
     * Get all the sellerTransactions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<SellerTransactionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all SellerTransactions");
        return sellerTransactionRepository.findAll(pageable)
            .map(sellerTransactionMapper::toDto);
    }


    /**
     * Get one sellerTransaction by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SellerTransactionDTO> findOne(Long id) {
        log.debug("Request to get SellerTransaction : {}", id);
        return sellerTransactionRepository.findById(id)
            .map(sellerTransactionMapper::toDto);
    }

    /**
     * Delete the sellerTransaction by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SellerTransaction : {}", id);
        sellerTransactionRepository.deleteById(id);
    }
}
