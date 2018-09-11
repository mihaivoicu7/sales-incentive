package com.mvoicu.sales.benefits.service.impl;

import com.mvoicu.sales.benefits.service.SellerWalletTransactionService;
import com.mvoicu.sales.benefits.domain.SellerWalletTransaction;
import com.mvoicu.sales.benefits.repository.SellerWalletTransactionRepository;
import com.mvoicu.sales.benefits.service.dto.SellerWalletTransactionDTO;
import com.mvoicu.sales.benefits.service.mapper.SellerWalletTransactionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing SellerWalletTransaction.
 */
@Service
@Transactional
public class SellerWalletTransactionServiceImpl implements SellerWalletTransactionService {

    private final Logger log = LoggerFactory.getLogger(SellerWalletTransactionServiceImpl.class);

    private final SellerWalletTransactionRepository sellerWalletTransactionRepository;

    private final SellerWalletTransactionMapper sellerWalletTransactionMapper;

    public SellerWalletTransactionServiceImpl(SellerWalletTransactionRepository sellerWalletTransactionRepository, SellerWalletTransactionMapper sellerWalletTransactionMapper) {
        this.sellerWalletTransactionRepository = sellerWalletTransactionRepository;
        this.sellerWalletTransactionMapper = sellerWalletTransactionMapper;
    }

    /**
     * Save a sellerWalletTransaction.
     *
     * @param sellerWalletTransactionDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SellerWalletTransactionDTO save(SellerWalletTransactionDTO sellerWalletTransactionDTO) {
        log.debug("Request to save SellerWalletTransaction : {}", sellerWalletTransactionDTO);
        SellerWalletTransaction sellerWalletTransaction = sellerWalletTransactionMapper.toEntity(sellerWalletTransactionDTO);
        sellerWalletTransaction = sellerWalletTransactionRepository.save(sellerWalletTransaction);
        return sellerWalletTransactionMapper.toDto(sellerWalletTransaction);
    }

    /**
     * Get all the sellerWalletTransactions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<SellerWalletTransactionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all SellerWalletTransactions");
        return sellerWalletTransactionRepository.findAll(pageable)
            .map(sellerWalletTransactionMapper::toDto);
    }


    /**
     * Get one sellerWalletTransaction by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SellerWalletTransactionDTO> findOne(Long id) {
        log.debug("Request to get SellerWalletTransaction : {}", id);
        return sellerWalletTransactionRepository.findById(id)
            .map(sellerWalletTransactionMapper::toDto);
    }

    /**
     * Delete the sellerWalletTransaction by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SellerWalletTransaction : {}", id);
        sellerWalletTransactionRepository.deleteById(id);
    }
}
