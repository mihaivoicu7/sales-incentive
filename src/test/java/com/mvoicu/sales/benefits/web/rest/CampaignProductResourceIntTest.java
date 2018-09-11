package com.mvoicu.sales.benefits.web.rest;

import com.mvoicu.sales.benefits.SalesBenefitApp;

import com.mvoicu.sales.benefits.domain.CampaignProduct;
import com.mvoicu.sales.benefits.repository.CampaignProductRepository;
import com.mvoicu.sales.benefits.service.CampaignProductService;
import com.mvoicu.sales.benefits.service.dto.CampaignProductDTO;
import com.mvoicu.sales.benefits.service.mapper.CampaignProductMapper;
import com.mvoicu.sales.benefits.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.mvoicu.sales.benefits.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CampaignProductResource REST controller.
 *
 * @see CampaignProductResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SalesBenefitApp.class)
public class CampaignProductResourceIntTest {

    private static final Double DEFAULT_PRICE = 1D;
    private static final Double UPDATED_PRICE = 2D;

    private static final Boolean DEFAULT_IS_ACTIVE = false;
    private static final Boolean UPDATED_IS_ACTIVE = true;

    private static final Double DEFAULT_DISCOUNT = 1D;
    private static final Double UPDATED_DISCOUNT = 2D;

    @Autowired
    private CampaignProductRepository campaignProductRepository;

    @Autowired
    private CampaignProductMapper campaignProductMapper;
    
    @Autowired
    private CampaignProductService campaignProductService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCampaignProductMockMvc;

    private CampaignProduct campaignProduct;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CampaignProductResource campaignProductResource = new CampaignProductResource(campaignProductService);
        this.restCampaignProductMockMvc = MockMvcBuilders.standaloneSetup(campaignProductResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CampaignProduct createEntity(EntityManager em) {
        CampaignProduct campaignProduct = new CampaignProduct()
            .price(DEFAULT_PRICE)
            .isActive(DEFAULT_IS_ACTIVE)
            .discount(DEFAULT_DISCOUNT);
        return campaignProduct;
    }

    @Before
    public void initTest() {
        campaignProduct = createEntity(em);
    }

    @Test
    @Transactional
    public void createCampaignProduct() throws Exception {
        int databaseSizeBeforeCreate = campaignProductRepository.findAll().size();

        // Create the CampaignProduct
        CampaignProductDTO campaignProductDTO = campaignProductMapper.toDto(campaignProduct);
        restCampaignProductMockMvc.perform(post("/api/campaign-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campaignProductDTO)))
            .andExpect(status().isCreated());

        // Validate the CampaignProduct in the database
        List<CampaignProduct> campaignProductList = campaignProductRepository.findAll();
        assertThat(campaignProductList).hasSize(databaseSizeBeforeCreate + 1);
        CampaignProduct testCampaignProduct = campaignProductList.get(campaignProductList.size() - 1);
        assertThat(testCampaignProduct.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testCampaignProduct.isIsActive()).isEqualTo(DEFAULT_IS_ACTIVE);
        assertThat(testCampaignProduct.getDiscount()).isEqualTo(DEFAULT_DISCOUNT);
    }

    @Test
    @Transactional
    public void createCampaignProductWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = campaignProductRepository.findAll().size();

        // Create the CampaignProduct with an existing ID
        campaignProduct.setId(1L);
        CampaignProductDTO campaignProductDTO = campaignProductMapper.toDto(campaignProduct);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCampaignProductMockMvc.perform(post("/api/campaign-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campaignProductDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CampaignProduct in the database
        List<CampaignProduct> campaignProductList = campaignProductRepository.findAll();
        assertThat(campaignProductList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCampaignProducts() throws Exception {
        // Initialize the database
        campaignProductRepository.saveAndFlush(campaignProduct);

        // Get all the campaignProductList
        restCampaignProductMockMvc.perform(get("/api/campaign-products?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(campaignProduct.getId().intValue())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].isActive").value(hasItem(DEFAULT_IS_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].discount").value(hasItem(DEFAULT_DISCOUNT.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getCampaignProduct() throws Exception {
        // Initialize the database
        campaignProductRepository.saveAndFlush(campaignProduct);

        // Get the campaignProduct
        restCampaignProductMockMvc.perform(get("/api/campaign-products/{id}", campaignProduct.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(campaignProduct.getId().intValue()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.isActive").value(DEFAULT_IS_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.discount").value(DEFAULT_DISCOUNT.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCampaignProduct() throws Exception {
        // Get the campaignProduct
        restCampaignProductMockMvc.perform(get("/api/campaign-products/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCampaignProduct() throws Exception {
        // Initialize the database
        campaignProductRepository.saveAndFlush(campaignProduct);

        int databaseSizeBeforeUpdate = campaignProductRepository.findAll().size();

        // Update the campaignProduct
        CampaignProduct updatedCampaignProduct = campaignProductRepository.findById(campaignProduct.getId()).get();
        // Disconnect from session so that the updates on updatedCampaignProduct are not directly saved in db
        em.detach(updatedCampaignProduct);
        updatedCampaignProduct
            .price(UPDATED_PRICE)
            .isActive(UPDATED_IS_ACTIVE)
            .discount(UPDATED_DISCOUNT);
        CampaignProductDTO campaignProductDTO = campaignProductMapper.toDto(updatedCampaignProduct);

        restCampaignProductMockMvc.perform(put("/api/campaign-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campaignProductDTO)))
            .andExpect(status().isOk());

        // Validate the CampaignProduct in the database
        List<CampaignProduct> campaignProductList = campaignProductRepository.findAll();
        assertThat(campaignProductList).hasSize(databaseSizeBeforeUpdate);
        CampaignProduct testCampaignProduct = campaignProductList.get(campaignProductList.size() - 1);
        assertThat(testCampaignProduct.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testCampaignProduct.isIsActive()).isEqualTo(UPDATED_IS_ACTIVE);
        assertThat(testCampaignProduct.getDiscount()).isEqualTo(UPDATED_DISCOUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingCampaignProduct() throws Exception {
        int databaseSizeBeforeUpdate = campaignProductRepository.findAll().size();

        // Create the CampaignProduct
        CampaignProductDTO campaignProductDTO = campaignProductMapper.toDto(campaignProduct);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCampaignProductMockMvc.perform(put("/api/campaign-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campaignProductDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CampaignProduct in the database
        List<CampaignProduct> campaignProductList = campaignProductRepository.findAll();
        assertThat(campaignProductList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCampaignProduct() throws Exception {
        // Initialize the database
        campaignProductRepository.saveAndFlush(campaignProduct);

        int databaseSizeBeforeDelete = campaignProductRepository.findAll().size();

        // Get the campaignProduct
        restCampaignProductMockMvc.perform(delete("/api/campaign-products/{id}", campaignProduct.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CampaignProduct> campaignProductList = campaignProductRepository.findAll();
        assertThat(campaignProductList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CampaignProduct.class);
        CampaignProduct campaignProduct1 = new CampaignProduct();
        campaignProduct1.setId(1L);
        CampaignProduct campaignProduct2 = new CampaignProduct();
        campaignProduct2.setId(campaignProduct1.getId());
        assertThat(campaignProduct1).isEqualTo(campaignProduct2);
        campaignProduct2.setId(2L);
        assertThat(campaignProduct1).isNotEqualTo(campaignProduct2);
        campaignProduct1.setId(null);
        assertThat(campaignProduct1).isNotEqualTo(campaignProduct2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CampaignProductDTO.class);
        CampaignProductDTO campaignProductDTO1 = new CampaignProductDTO();
        campaignProductDTO1.setId(1L);
        CampaignProductDTO campaignProductDTO2 = new CampaignProductDTO();
        assertThat(campaignProductDTO1).isNotEqualTo(campaignProductDTO2);
        campaignProductDTO2.setId(campaignProductDTO1.getId());
        assertThat(campaignProductDTO1).isEqualTo(campaignProductDTO2);
        campaignProductDTO2.setId(2L);
        assertThat(campaignProductDTO1).isNotEqualTo(campaignProductDTO2);
        campaignProductDTO1.setId(null);
        assertThat(campaignProductDTO1).isNotEqualTo(campaignProductDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(campaignProductMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(campaignProductMapper.fromId(null)).isNull();
    }
}
