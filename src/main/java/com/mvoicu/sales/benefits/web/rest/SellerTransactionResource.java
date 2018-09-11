package com.mvoicu.sales.benefits.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mvoicu.sales.benefits.service.SellerTransactionService;
import com.mvoicu.sales.benefits.web.rest.errors.BadRequestAlertException;
import com.mvoicu.sales.benefits.web.rest.util.HeaderUtil;
import com.mvoicu.sales.benefits.web.rest.util.PaginationUtil;
import com.mvoicu.sales.benefits.service.dto.SellerTransactionDTO;
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
 * REST controller for managing SellerTransaction.
 */
@RestController
@RequestMapping("/api")
public class SellerTransactionResource {

    private final Logger log = LoggerFactory.getLogger(SellerTransactionResource.class);

    private static final String ENTITY_NAME = "sellerTransaction";

    private final SellerTransactionService sellerTransactionService;

    public SellerTransactionResource(SellerTransactionService sellerTransactionService) {
        this.sellerTransactionService = sellerTransactionService;
    }

    /**
     * POST  /seller-transactions : Create a new sellerTransaction.
     *
     * @param sellerTransactionDTO the sellerTransactionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sellerTransactionDTO, or with status 400 (Bad Request) if the sellerTransaction has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/seller-transactions")
    @Timed
    public ResponseEntity<SellerTransactionDTO> createSellerTransaction(@RequestBody SellerTransactionDTO sellerTransactionDTO) throws URISyntaxException {
        log.debug("REST request to save SellerTransaction : {}", sellerTransactionDTO);
        if (sellerTransactionDTO.getId() != null) {
            throw new BadRequestAlertException("A new sellerTransaction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SellerTransactionDTO result = sellerTransactionService.save(sellerTransactionDTO);
        return ResponseEntity.created(new URI("/api/seller-transactions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /seller-transactions : Updates an existing sellerTransaction.
     *
     * @param sellerTransactionDTO the sellerTransactionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sellerTransactionDTO,
     * or with status 400 (Bad Request) if the sellerTransactionDTO is not valid,
     * or with status 500 (Internal Server Error) if the sellerTransactionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/seller-transactions")
    @Timed
    public ResponseEntity<SellerTransactionDTO> updateSellerTransaction(@RequestBody SellerTransactionDTO sellerTransactionDTO) throws URISyntaxException {
        log.debug("REST request to update SellerTransaction : {}", sellerTransactionDTO);
        if (sellerTransactionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SellerTransactionDTO result = sellerTransactionService.save(sellerTransactionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sellerTransactionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /seller-transactions : get all the sellerTransactions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of sellerTransactions in body
     */
    @GetMapping("/seller-transactions")
    @Timed
    public ResponseEntity<List<SellerTransactionDTO>> getAllSellerTransactions(Pageable pageable) {
        log.debug("REST request to get a page of SellerTransactions");
        Page<SellerTransactionDTO> page = sellerTransactionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/seller-transactions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /seller-transactions/:id : get the "id" sellerTransaction.
     *
     * @param id the id of the sellerTransactionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sellerTransactionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/seller-transactions/{id}")
    @Timed
    public ResponseEntity<SellerTransactionDTO> getSellerTransaction(@PathVariable Long id) {
        log.debug("REST request to get SellerTransaction : {}", id);
        Optional<SellerTransactionDTO> sellerTransactionDTO = sellerTransactionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(sellerTransactionDTO);
    }

    /**
     * DELETE  /seller-transactions/:id : delete the "id" sellerTransaction.
     *
     * @param id the id of the sellerTransactionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/seller-transactions/{id}")
    @Timed
    public ResponseEntity<Void> deleteSellerTransaction(@PathVariable Long id) {
        log.debug("REST request to delete SellerTransaction : {}", id);
        sellerTransactionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
