package com.mvoicu.sales.benefits.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mvoicu.sales.benefits.service.CampaignProductService;
import com.mvoicu.sales.benefits.web.rest.errors.BadRequestAlertException;
import com.mvoicu.sales.benefits.web.rest.util.HeaderUtil;
import com.mvoicu.sales.benefits.service.dto.CampaignProductDTO;
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
 * REST controller for managing CampaignProduct.
 */
@RestController
@RequestMapping("/api")
public class CampaignProductResource {

    private final Logger log = LoggerFactory.getLogger(CampaignProductResource.class);

    private static final String ENTITY_NAME = "campaignProduct";

    private final CampaignProductService campaignProductService;

    public CampaignProductResource(CampaignProductService campaignProductService) {
        this.campaignProductService = campaignProductService;
    }

    /**
     * POST  /campaign-products : Create a new campaignProduct.
     *
     * @param campaignProductDTO the campaignProductDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new campaignProductDTO, or with status 400 (Bad Request) if the campaignProduct has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/campaign-products")
    @Timed
    public ResponseEntity<CampaignProductDTO> createCampaignProduct(@RequestBody CampaignProductDTO campaignProductDTO) throws URISyntaxException {
        log.debug("REST request to save CampaignProduct : {}", campaignProductDTO);
        if (campaignProductDTO.getId() != null) {
            throw new BadRequestAlertException("A new campaignProduct cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CampaignProductDTO result = campaignProductService.save(campaignProductDTO);
        return ResponseEntity.created(new URI("/api/campaign-products/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /campaign-products : Updates an existing campaignProduct.
     *
     * @param campaignProductDTO the campaignProductDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated campaignProductDTO,
     * or with status 400 (Bad Request) if the campaignProductDTO is not valid,
     * or with status 500 (Internal Server Error) if the campaignProductDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/campaign-products")
    @Timed
    public ResponseEntity<CampaignProductDTO> updateCampaignProduct(@RequestBody CampaignProductDTO campaignProductDTO) throws URISyntaxException {
        log.debug("REST request to update CampaignProduct : {}", campaignProductDTO);
        if (campaignProductDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CampaignProductDTO result = campaignProductService.save(campaignProductDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, campaignProductDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /campaign-products : get all the campaignProducts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of campaignProducts in body
     */
    @GetMapping("/campaign-products")
    @Timed
    public List<CampaignProductDTO> getAllCampaignProducts() {
        log.debug("REST request to get all CampaignProducts");
        return campaignProductService.findAll();
    }

    /**
     * GET  /campaign-products/:id : get the "id" campaignProduct.
     *
     * @param id the id of the campaignProductDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the campaignProductDTO, or with status 404 (Not Found)
     */
    @GetMapping("/campaign-products/{id}")
    @Timed
    public ResponseEntity<CampaignProductDTO> getCampaignProduct(@PathVariable Long id) {
        log.debug("REST request to get CampaignProduct : {}", id);
        Optional<CampaignProductDTO> campaignProductDTO = campaignProductService.findOne(id);
        return ResponseUtil.wrapOrNotFound(campaignProductDTO);
    }

    /**
     * DELETE  /campaign-products/:id : delete the "id" campaignProduct.
     *
     * @param id the id of the campaignProductDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/campaign-products/{id}")
    @Timed
    public ResponseEntity<Void> deleteCampaignProduct(@PathVariable Long id) {
        log.debug("REST request to delete CampaignProduct : {}", id);
        campaignProductService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
