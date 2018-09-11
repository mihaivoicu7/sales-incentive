package com.mvoicu.sales.benefits.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mvoicu.sales.benefits.service.SellerService;
import com.mvoicu.sales.benefits.web.rest.errors.BadRequestAlertException;
import com.mvoicu.sales.benefits.web.rest.util.HeaderUtil;
import com.mvoicu.sales.benefits.service.dto.SellerDTO;
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
 * REST controller for managing Seller.
 */
@RestController
@RequestMapping("/api")
public class SellerResource {

    private final Logger log = LoggerFactory.getLogger(SellerResource.class);

    private static final String ENTITY_NAME = "seller";

    private final SellerService sellerService;

    public SellerResource(SellerService sellerService) {
        this.sellerService = sellerService;
    }

    /**
     * POST  /sellers : Create a new seller.
     *
     * @param sellerDTO the sellerDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sellerDTO, or with status 400 (Bad Request) if the seller has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sellers")
    @Timed
    public ResponseEntity<SellerDTO> createSeller(@RequestBody SellerDTO sellerDTO) throws URISyntaxException {
        log.debug("REST request to save Seller : {}", sellerDTO);
        if (sellerDTO.getId() != null) {
            throw new BadRequestAlertException("A new seller cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SellerDTO result = sellerService.save(sellerDTO);
        return ResponseEntity.created(new URI("/api/sellers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sellers : Updates an existing seller.
     *
     * @param sellerDTO the sellerDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sellerDTO,
     * or with status 400 (Bad Request) if the sellerDTO is not valid,
     * or with status 500 (Internal Server Error) if the sellerDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sellers")
    @Timed
    public ResponseEntity<SellerDTO> updateSeller(@RequestBody SellerDTO sellerDTO) throws URISyntaxException {
        log.debug("REST request to update Seller : {}", sellerDTO);
        if (sellerDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SellerDTO result = sellerService.save(sellerDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sellerDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sellers : get all the sellers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sellers in body
     */
    @GetMapping("/sellers")
    @Timed
    public List<SellerDTO> getAllSellers() {
        log.debug("REST request to get all Sellers");
        return sellerService.findAll();
    }

    /**
     * GET  /sellers/:id : get the "id" seller.
     *
     * @param id the id of the sellerDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sellerDTO, or with status 404 (Not Found)
     */
    @GetMapping("/sellers/{id}")
    @Timed
    public ResponseEntity<SellerDTO> getSeller(@PathVariable Long id) {
        log.debug("REST request to get Seller : {}", id);
        Optional<SellerDTO> sellerDTO = sellerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(sellerDTO);
    }

    /**
     * DELETE  /sellers/:id : delete the "id" seller.
     *
     * @param id the id of the sellerDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sellers/{id}")
    @Timed
    public ResponseEntity<Void> deleteSeller(@PathVariable Long id) {
        log.debug("REST request to delete Seller : {}", id);
        sellerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
