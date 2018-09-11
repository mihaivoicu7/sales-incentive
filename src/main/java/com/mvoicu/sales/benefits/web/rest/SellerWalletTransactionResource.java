package com.mvoicu.sales.benefits.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mvoicu.sales.benefits.service.SellerWalletTransactionService;
import com.mvoicu.sales.benefits.web.rest.errors.BadRequestAlertException;
import com.mvoicu.sales.benefits.web.rest.util.HeaderUtil;
import com.mvoicu.sales.benefits.web.rest.util.PaginationUtil;
import com.mvoicu.sales.benefits.service.dto.SellerWalletTransactionDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SellerWalletTransaction.
 */
@RestController
@RequestMapping("/api")
public class SellerWalletTransactionResource {

    private final Logger log = LoggerFactory.getLogger(SellerWalletTransactionResource.class);

    private static final String ENTITY_NAME = "sellerWalletTransaction";

    private final SellerWalletTransactionService sellerWalletTransactionService;

    public SellerWalletTransactionResource(SellerWalletTransactionService sellerWalletTransactionService) {
        this.sellerWalletTransactionService = sellerWalletTransactionService;
    }

    /**
     * POST  /seller-wallet-transactions : Create a new sellerWalletTransaction.
     *
     * @param sellerWalletTransactionDTO the sellerWalletTransactionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sellerWalletTransactionDTO, or with status 400 (Bad Request) if the sellerWalletTransaction has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/seller-wallet-transactions")
    @Timed
    public ResponseEntity<SellerWalletTransactionDTO> createSellerWalletTransaction(@RequestBody SellerWalletTransactionDTO sellerWalletTransactionDTO) throws URISyntaxException {
        log.debug("REST request to save SellerWalletTransaction : {}", sellerWalletTransactionDTO);
        if (sellerWalletTransactionDTO.getId() != null) {
            throw new BadRequestAlertException("A new sellerWalletTransaction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SellerWalletTransactionDTO result = sellerWalletTransactionService.save(sellerWalletTransactionDTO);
        return ResponseEntity.created(new URI("/api/seller-wallet-transactions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /seller-wallet-transactions : Updates an existing sellerWalletTransaction.
     *
     * @param sellerWalletTransactionDTO the sellerWalletTransactionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sellerWalletTransactionDTO,
     * or with status 400 (Bad Request) if the sellerWalletTransactionDTO is not valid,
     * or with status 500 (Internal Server Error) if the sellerWalletTransactionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/seller-wallet-transactions")
    @Timed
    public ResponseEntity<SellerWalletTransactionDTO> updateSellerWalletTransaction(@RequestBody SellerWalletTransactionDTO sellerWalletTransactionDTO) throws URISyntaxException {
        log.debug("REST request to update SellerWalletTransaction : {}", sellerWalletTransactionDTO);
        if (sellerWalletTransactionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SellerWalletTransactionDTO result = sellerWalletTransactionService.save(sellerWalletTransactionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sellerWalletTransactionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /seller-wallet-transactions : get all the sellerWalletTransactions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of sellerWalletTransactions in body
     */
    @GetMapping("/seller-wallet-transactions")
    @Timed
    public ResponseEntity<List<SellerWalletTransactionDTO>> getAllSellerWalletTransactions(Pageable pageable) {
        log.debug("REST request to get a page of SellerWalletTransactions");
        Page<SellerWalletTransactionDTO> page = sellerWalletTransactionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/seller-wallet-transactions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /seller-wallet-transactions/:id : get the "id" sellerWalletTransaction.
     *
     * @param id the id of the sellerWalletTransactionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sellerWalletTransactionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/seller-wallet-transactions/{id}")
    @Timed
    public ResponseEntity<SellerWalletTransactionDTO> getSellerWalletTransaction(@PathVariable Long id) {
        log.debug("REST request to get SellerWalletTransaction : {}", id);
        Optional<SellerWalletTransactionDTO> sellerWalletTransactionDTO = sellerWalletTransactionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(sellerWalletTransactionDTO);
    }

    /**
     * DELETE  /seller-wallet-transactions/:id : delete the "id" sellerWalletTransaction.
     *
     * @param id the id of the sellerWalletTransactionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/seller-wallet-transactions/{id}")
    @Timed
    public ResponseEntity<Void> deleteSellerWalletTransaction(@PathVariable Long id) {
        log.debug("REST request to delete SellerWalletTransaction : {}", id);
        sellerWalletTransactionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
