package com.mvoicu.sales.benefits.web.rest;

import com.mvoicu.sales.benefits.SalesBenefitApp;

import com.mvoicu.sales.benefits.domain.SellerWallet;
import com.mvoicu.sales.benefits.repository.SellerWalletRepository;
import com.mvoicu.sales.benefits.service.SellerWalletService;
import com.mvoicu.sales.benefits.service.dto.SellerWalletDTO;
import com.mvoicu.sales.benefits.service.mapper.SellerWalletMapper;
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
 * Test class for the SellerWalletResource REST controller.
 *
 * @see SellerWalletResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SalesBenefitApp.class)
public class SellerWalletResourceIntTest {

    private static final Double DEFAULT_AVAILABLE_AMOUNT = 1D;
    private static final Double UPDATED_AVAILABLE_AMOUNT = 2D;

    private static final Double DEFAULT_IN_PENDING_AMOUNT = 1D;
    private static final Double UPDATED_IN_PENDING_AMOUNT = 2D;

    @Autowired
    private SellerWalletRepository sellerWalletRepository;

    @Autowired
    private SellerWalletMapper sellerWalletMapper;
    
    @Autowired
    private SellerWalletService sellerWalletService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSellerWalletMockMvc;

    private SellerWallet sellerWallet;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SellerWalletResource sellerWalletResource = new SellerWalletResource(sellerWalletService);
        this.restSellerWalletMockMvc = MockMvcBuilders.standaloneSetup(sellerWalletResource)
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
    public static SellerWallet createEntity(EntityManager em) {
        SellerWallet sellerWallet = new SellerWallet()
            .availableAmount(DEFAULT_AVAILABLE_AMOUNT)
            .inPendingAmount(DEFAULT_IN_PENDING_AMOUNT);
        return sellerWallet;
    }

    @Before
    public void initTest() {
        sellerWallet = createEntity(em);
    }

    @Test
    @Transactional
    public void createSellerWallet() throws Exception {
        int databaseSizeBeforeCreate = sellerWalletRepository.findAll().size();

        // Create the SellerWallet
        SellerWalletDTO sellerWalletDTO = sellerWalletMapper.toDto(sellerWallet);
        restSellerWalletMockMvc.perform(post("/api/seller-wallets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sellerWalletDTO)))
            .andExpect(status().isCreated());

        // Validate the SellerWallet in the database
        List<SellerWallet> sellerWalletList = sellerWalletRepository.findAll();
        assertThat(sellerWalletList).hasSize(databaseSizeBeforeCreate + 1);
        SellerWallet testSellerWallet = sellerWalletList.get(sellerWalletList.size() - 1);
        assertThat(testSellerWallet.getAvailableAmount()).isEqualTo(DEFAULT_AVAILABLE_AMOUNT);
        assertThat(testSellerWallet.getInPendingAmount()).isEqualTo(DEFAULT_IN_PENDING_AMOUNT);
    }

    @Test
    @Transactional
    public void createSellerWalletWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sellerWalletRepository.findAll().size();

        // Create the SellerWallet with an existing ID
        sellerWallet.setId(1L);
        SellerWalletDTO sellerWalletDTO = sellerWalletMapper.toDto(sellerWallet);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSellerWalletMockMvc.perform(post("/api/seller-wallets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sellerWalletDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SellerWallet in the database
        List<SellerWallet> sellerWalletList = sellerWalletRepository.findAll();
        assertThat(sellerWalletList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSellerWallets() throws Exception {
        // Initialize the database
        sellerWalletRepository.saveAndFlush(sellerWallet);

        // Get all the sellerWalletList
        restSellerWalletMockMvc.perform(get("/api/seller-wallets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sellerWallet.getId().intValue())))
            .andExpect(jsonPath("$.[*].availableAmount").value(hasItem(DEFAULT_AVAILABLE_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].inPendingAmount").value(hasItem(DEFAULT_IN_PENDING_AMOUNT.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getSellerWallet() throws Exception {
        // Initialize the database
        sellerWalletRepository.saveAndFlush(sellerWallet);

        // Get the sellerWallet
        restSellerWalletMockMvc.perform(get("/api/seller-wallets/{id}", sellerWallet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sellerWallet.getId().intValue()))
            .andExpect(jsonPath("$.availableAmount").value(DEFAULT_AVAILABLE_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.inPendingAmount").value(DEFAULT_IN_PENDING_AMOUNT.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSellerWallet() throws Exception {
        // Get the sellerWallet
        restSellerWalletMockMvc.perform(get("/api/seller-wallets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSellerWallet() throws Exception {
        // Initialize the database
        sellerWalletRepository.saveAndFlush(sellerWallet);

        int databaseSizeBeforeUpdate = sellerWalletRepository.findAll().size();

        // Update the sellerWallet
        SellerWallet updatedSellerWallet = sellerWalletRepository.findById(sellerWallet.getId()).get();
        // Disconnect from session so that the updates on updatedSellerWallet are not directly saved in db
        em.detach(updatedSellerWallet);
        updatedSellerWallet
            .availableAmount(UPDATED_AVAILABLE_AMOUNT)
            .inPendingAmount(UPDATED_IN_PENDING_AMOUNT);
        SellerWalletDTO sellerWalletDTO = sellerWalletMapper.toDto(updatedSellerWallet);

        restSellerWalletMockMvc.perform(put("/api/seller-wallets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sellerWalletDTO)))
            .andExpect(status().isOk());

        // Validate the SellerWallet in the database
        List<SellerWallet> sellerWalletList = sellerWalletRepository.findAll();
        assertThat(sellerWalletList).hasSize(databaseSizeBeforeUpdate);
        SellerWallet testSellerWallet = sellerWalletList.get(sellerWalletList.size() - 1);
        assertThat(testSellerWallet.getAvailableAmount()).isEqualTo(UPDATED_AVAILABLE_AMOUNT);
        assertThat(testSellerWallet.getInPendingAmount()).isEqualTo(UPDATED_IN_PENDING_AMOUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingSellerWallet() throws Exception {
        int databaseSizeBeforeUpdate = sellerWalletRepository.findAll().size();

        // Create the SellerWallet
        SellerWalletDTO sellerWalletDTO = sellerWalletMapper.toDto(sellerWallet);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSellerWalletMockMvc.perform(put("/api/seller-wallets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sellerWalletDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SellerWallet in the database
        List<SellerWallet> sellerWalletList = sellerWalletRepository.findAll();
        assertThat(sellerWalletList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSellerWallet() throws Exception {
        // Initialize the database
        sellerWalletRepository.saveAndFlush(sellerWallet);

        int databaseSizeBeforeDelete = sellerWalletRepository.findAll().size();

        // Get the sellerWallet
        restSellerWalletMockMvc.perform(delete("/api/seller-wallets/{id}", sellerWallet.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SellerWallet> sellerWalletList = sellerWalletRepository.findAll();
        assertThat(sellerWalletList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SellerWallet.class);
        SellerWallet sellerWallet1 = new SellerWallet();
        sellerWallet1.setId(1L);
        SellerWallet sellerWallet2 = new SellerWallet();
        sellerWallet2.setId(sellerWallet1.getId());
        assertThat(sellerWallet1).isEqualTo(sellerWallet2);
        sellerWallet2.setId(2L);
        assertThat(sellerWallet1).isNotEqualTo(sellerWallet2);
        sellerWallet1.setId(null);
        assertThat(sellerWallet1).isNotEqualTo(sellerWallet2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SellerWalletDTO.class);
        SellerWalletDTO sellerWalletDTO1 = new SellerWalletDTO();
        sellerWalletDTO1.setId(1L);
        SellerWalletDTO sellerWalletDTO2 = new SellerWalletDTO();
        assertThat(sellerWalletDTO1).isNotEqualTo(sellerWalletDTO2);
        sellerWalletDTO2.setId(sellerWalletDTO1.getId());
        assertThat(sellerWalletDTO1).isEqualTo(sellerWalletDTO2);
        sellerWalletDTO2.setId(2L);
        assertThat(sellerWalletDTO1).isNotEqualTo(sellerWalletDTO2);
        sellerWalletDTO1.setId(null);
        assertThat(sellerWalletDTO1).isNotEqualTo(sellerWalletDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(sellerWalletMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(sellerWalletMapper.fromId(null)).isNull();
    }
}
