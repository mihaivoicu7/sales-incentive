package com.mvoicu.sales.benefits.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mvoicu.sales.benefits.service.SellerWalletService;
import com.mvoicu.sales.benefits.web.rest.errors.BadRequestAlertException;
import com.mvoicu.sales.benefits.web.rest.util.HeaderUtil;
import com.mvoicu.sales.benefits.service.dto.SellerWalletDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SellerWallet.
 */
@RestController
@RequestMapping("/api")
public class SellerWalletResource {

    private final Logger log = LoggerFactory.getLogger(SellerWalletResource.class);

    private static final String ENTITY_NAME = "sellerWallet";

    private final SellerWalletService sellerWalletService;

    public SellerWalletResource(SellerWalletService sellerWalletService) {
        this.sellerWalletService = sellerWalletService;
    }

    /**
     * POST  /seller-wallets : Create a new sellerWallet.
     *
     * @param sellerWalletDTO the sellerWalletDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sellerWalletDTO, or with status 400 (Bad Request) if the sellerWallet has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/seller-wallets")
    @Timed
    public ResponseEntity<SellerWalletDTO> createSellerWallet(@RequestBody SellerWalletDTO sellerWalletDTO) throws URISyntaxException {
        log.debug("REST request to save SellerWallet : {}", sellerWalletDTO);
        if (sellerWalletDTO.getId() != null) {
            throw new BadRequestAlertException("A new sellerWallet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SellerWalletDTO result = sellerWalletService.save(sellerWalletDTO);
        return ResponseEntity.created(new URI("/api/seller-wallets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /seller-wallets : Updates an existing sellerWallet.
     *
     * @param sellerWalletDTO the sellerWalletDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sellerWalletDTO,
     * or with status 400 (Bad Request) if the sellerWalletDTO is not valid,
     * or with status 500 (Internal Server Error) if the sellerWalletDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/seller-wallets")
    @Timed
    public ResponseEntity<SellerWalletDTO> updateSellerWallet(@RequestBody SellerWalletDTO sellerWalletDTO) throws URISyntaxException {
        log.debug("REST request to update SellerWallet : {}", sellerWalletDTO);
        if (sellerWalletDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SellerWalletDTO result = sellerWalletService.save(sellerWalletDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sellerWalletDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /seller-wallets : get all the sellerWallets.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sellerWallets in body
     */
    @GetMapping("/seller-wallets")
    @Timed
    public List<SellerWalletDTO> getAllSellerWallets() {
        log.debug("REST request to get all SellerWallets");
        return sellerWalletService.findAll();
    }

    /**
     * GET  /seller-wallets/:id : get the "id" sellerWallet.
     *
     * @param id the id of the sellerWalletDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sellerWalletDTO, or with status 404 (Not Found)
     */
    @GetMapping("/seller-wallets/{id}")
    @Timed
    public ResponseEntity<SellerWalletDTO> getSellerWallet(@PathVariable Long id) {
        log.debug("REST request to get SellerWallet : {}", id);
        Optional<SellerWalletDTO> sellerWalletDTO = sellerWalletService.findOne(id);
        return ResponseUtil.wrapOrNotFound(sellerWalletDTO);
    }

    /**
     * DELETE  /seller-wallets/:id : delete the "id" sellerWallet.
     *
     * @param id the id of the sellerWalletDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/seller-wallets/{id}")
    @Timed
    public ResponseEntity<Void> deleteSellerWallet(@PathVariable Long id) {
        log.debug("REST request to delete SellerWallet : {}", id);
        sellerWalletService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
