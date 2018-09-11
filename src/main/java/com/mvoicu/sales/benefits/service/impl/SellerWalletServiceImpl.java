package com.mvoicu.sales.benefits.service.impl;

import com.mvoicu.sales.benefits.service.SellerWalletService;
import com.mvoicu.sales.benefits.domain.SellerWallet;
import com.mvoicu.sales.benefits.repository.SellerWalletRepository;
import com.mvoicu.sales.benefits.service.dto.SellerWalletDTO;
import com.mvoicu.sales.benefits.service.mapper.SellerWalletMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing SellerWallet.
 */
@Service
@Transactional
public class SellerWalletServiceImpl implements SellerWalletService {

    private final Logger log = LoggerFactory.getLogger(SellerWalletServiceImpl.class);

    private final SellerWalletRepository sellerWalletRepository;

    private final SellerWalletMapper sellerWalletMapper;

    public SellerWalletServiceImpl(SellerWalletRepository sellerWalletRepository, SellerWalletMapper sellerWalletMapper) {
        this.sellerWalletRepository = sellerWalletRepository;
        this.sellerWalletMapper = sellerWalletMapper;
    }

    /**
     * Save a sellerWallet.
     *
     * @param sellerWalletDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SellerWalletDTO save(SellerWalletDTO sellerWalletDTO) {
        log.debug("Request to save SellerWallet : {}", sellerWalletDTO);
        SellerWallet sellerWallet = sellerWalletMapper.toEntity(sellerWalletDTO);
        sellerWallet = sellerWalletRepository.save(sellerWallet);
        return sellerWalletMapper.toDto(sellerWallet);
    }

    /**
     * Get all the sellerWallets.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SellerWalletDTO> findAll() {
        log.debug("Request to get all SellerWallets");
        return sellerWalletRepository.findAll().stream()
            .map(sellerWalletMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one sellerWallet by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SellerWalletDTO> findOne(Long id) {
        log.debug("Request to get SellerWallet : {}", id);
        return sellerWalletRepository.findById(id)
            .map(sellerWalletMapper::toDto);
    }

    /**
     * Delete the sellerWallet by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SellerWallet : {}", id);
        sellerWalletRepository.deleteById(id);
    }
}
