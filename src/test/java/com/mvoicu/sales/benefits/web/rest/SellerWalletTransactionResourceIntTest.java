package com.mvoicu.sales.benefits.web.rest;

import com.mvoicu.sales.benefits.SalesBenefitApp;

import com.mvoicu.sales.benefits.domain.SellerWalletTransaction;
import com.mvoicu.sales.benefits.repository.SellerWalletTransactionRepository;
import com.mvoicu.sales.benefits.service.SellerWalletTransactionService;
import com.mvoicu.sales.benefits.service.dto.SellerWalletTransactionDTO;
import com.mvoicu.sales.benefits.service.mapper.SellerWalletTransactionMapper;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.mvoicu.sales.benefits.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mvoicu.sales.benefits.domain.enumeration.WalletTransactionType;
/**
 * Test class for the SellerWalletTransactionResource REST controller.
 *
 * @see SellerWalletTransactionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SalesBenefitApp.class)
public class SellerWalletTransactionResourceIntTest {

    private static final Double DEFAULT_AMOUNT = 1D;
    private static final Double UPDATED_AMOUNT = 2D;

    private static final WalletTransactionType DEFAULT_TRANSACTION_TYPE = WalletTransactionType.IN_PENDING;
    private static final WalletTransactionType UPDATED_TRANSACTION_TYPE = WalletTransactionType.IN_CONFIRMED;

    private static final Instant DEFAULT_TRANSACTION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TRANSACTION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private SellerWalletTransactionRepository sellerWalletTransactionRepository;

    @Autowired
    private SellerWalletTransactionMapper sellerWalletTransactionMapper;
    
    @Autowired
    private SellerWalletTransactionService sellerWalletTransactionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSellerWalletTransactionMockMvc;

    private SellerWalletTransaction sellerWalletTransaction;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SellerWalletTransactionResource sellerWalletTransactionResource = new SellerWalletTransactionResource(sellerWalletTransactionService);
        this.restSellerWalletTransactionMockMvc = MockMvcBuilders.standaloneSetup(sellerWalletTransactionResource)
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
    public static SellerWalletTransaction createEntity(EntityManager em) {
        SellerWalletTransaction sellerWalletTransaction = new SellerWalletTransaction()
            .amount(DEFAULT_AMOUNT)
            .transactionType(DEFAULT_TRANSACTION_TYPE)
            .transactionDate(DEFAULT_TRANSACTION_DATE);
        return sellerWalletTransaction;
    }

    @Before
    public void initTest() {
        sellerWalletTransaction = createEntity(em);
    }

    @Test
    @Transactional
    public void createSellerWalletTransaction() throws Exception {
        int databaseSizeBeforeCreate = sellerWalletTransactionRepository.findAll().size();

        // Create the SellerWalletTransaction
        SellerWalletTransactionDTO sellerWalletTransactionDTO = sellerWalletTransactionMapper.toDto(sellerWalletTransaction);
        restSellerWalletTransactionMockMvc.perform(post("/api/seller-wallet-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sellerWalletTransactionDTO)))
            .andExpect(status().isCreated());

        // Validate the SellerWalletTransaction in the database
        List<SellerWalletTransaction> sellerWalletTransactionList = sellerWalletTransactionRepository.findAll();
        assertThat(sellerWalletTransactionList).hasSize(databaseSizeBeforeCreate + 1);
        SellerWalletTransaction testSellerWalletTransaction = sellerWalletTransactionList.get(sellerWalletTransactionList.size() - 1);
        assertThat(testSellerWalletTransaction.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testSellerWalletTransaction.getTransactionType()).isEqualTo(DEFAULT_TRANSACTION_TYPE);
        assertThat(testSellerWalletTransaction.getTransactionDate()).isEqualTo(DEFAULT_TRANSACTION_DATE);
    }

    @Test
    @Transactional
    public void createSellerWalletTransactionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sellerWalletTransactionRepository.findAll().size();

        // Create the SellerWalletTransaction with an existing ID
        sellerWalletTransaction.setId(1L);
        SellerWalletTransactionDTO sellerWalletTransactionDTO = sellerWalletTransactionMapper.toDto(sellerWalletTransaction);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSellerWalletTransactionMockMvc.perform(post("/api/seller-wallet-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sellerWalletTransactionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SellerWalletTransaction in the database
        List<SellerWalletTransaction> sellerWalletTransactionList = sellerWalletTransactionRepository.findAll();
        assertThat(sellerWalletTransactionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSellerWalletTransactions() throws Exception {
        // Initialize the database
        sellerWalletTransactionRepository.saveAndFlush(sellerWalletTransaction);

        // Get all the sellerWalletTransactionList
        restSellerWalletTransactionMockMvc.perform(get("/api/seller-wallet-transactions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sellerWalletTransaction.getId().intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].transactionType").value(hasItem(DEFAULT_TRANSACTION_TYPE.toString())))
            .andExpect(jsonPath("$.[*].transactionDate").value(hasItem(DEFAULT_TRANSACTION_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getSellerWalletTransaction() throws Exception {
        // Initialize the database
        sellerWalletTransactionRepository.saveAndFlush(sellerWalletTransaction);

        // Get the sellerWalletTransaction
        restSellerWalletTransactionMockMvc.perform(get("/api/seller-wallet-transactions/{id}", sellerWalletTransaction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sellerWalletTransaction.getId().intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.transactionType").value(DEFAULT_TRANSACTION_TYPE.toString()))
            .andExpect(jsonPath("$.transactionDate").value(DEFAULT_TRANSACTION_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSellerWalletTransaction() throws Exception {
        // Get the sellerWalletTransaction
        restSellerWalletTransactionMockMvc.perform(get("/api/seller-wallet-transactions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSellerWalletTransaction() throws Exception {
        // Initialize the database
        sellerWalletTransactionRepository.saveAndFlush(sellerWalletTransaction);

        int databaseSizeBeforeUpdate = sellerWalletTransactionRepository.findAll().size();

        // Update the sellerWalletTransaction
        SellerWalletTransaction updatedSellerWalletTransaction = sellerWalletTransactionRepository.findById(sellerWalletTransaction.getId()).get();
        // Disconnect from session so that the updates on updatedSellerWalletTransaction are not directly saved in db
        em.detach(updatedSellerWalletTransaction);
        updatedSellerWalletTransaction
            .amount(UPDATED_AMOUNT)
            .transactionType(UPDATED_TRANSACTION_TYPE)
            .transactionDate(UPDATED_TRANSACTION_DATE);
        SellerWalletTransactionDTO sellerWalletTransactionDTO = sellerWalletTransactionMapper.toDto(updatedSellerWalletTransaction);

        restSellerWalletTransactionMockMvc.perform(put("/api/seller-wallet-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sellerWalletTransactionDTO)))
            .andExpect(status().isOk());

        // Validate the SellerWalletTransaction in the database
        List<SellerWalletTransaction> sellerWalletTransactionList = sellerWalletTransactionRepository.findAll();
        assertThat(sellerWalletTransactionList).hasSize(databaseSizeBeforeUpdate);
        SellerWalletTransaction testSellerWalletTransaction = sellerWalletTransactionList.get(sellerWalletTransactionList.size() - 1);
        assertThat(testSellerWalletTransaction.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testSellerWalletTransaction.getTransactionType()).isEqualTo(UPDATED_TRANSACTION_TYPE);
        assertThat(testSellerWalletTransaction.getTransactionDate()).isEqualTo(UPDATED_TRANSACTION_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingSellerWalletTransaction() throws Exception {
        int databaseSizeBeforeUpdate = sellerWalletTransactionRepository.findAll().size();

        // Create the SellerWalletTransaction
        SellerWalletTransactionDTO sellerWalletTransactionDTO = sellerWalletTransactionMapper.toDto(sellerWalletTransaction);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSellerWalletTransactionMockMvc.perform(put("/api/seller-wallet-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sellerWalletTransactionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SellerWalletTransaction in the database
        List<SellerWalletTransaction> sellerWalletTransactionList = sellerWalletTransactionRepository.findAll();
        assertThat(sellerWalletTransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSellerWalletTransaction() throws Exception {
        // Initialize the database
        sellerWalletTransactionRepository.saveAndFlush(sellerWalletTransaction);

        int databaseSizeBeforeDelete = sellerWalletTransactionRepository.findAll().size();

        // Get the sellerWalletTransaction
        restSellerWalletTransactionMockMvc.perform(delete("/api/seller-wallet-transactions/{id}", sellerWalletTransaction.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SellerWalletTransaction> sellerWalletTransactionList = sellerWalletTransactionRepository.findAll();
        assertThat(sellerWalletTransactionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SellerWalletTransaction.class);
        SellerWalletTransaction sellerWalletTransaction1 = new SellerWalletTransaction();
        sellerWalletTransaction1.setId(1L);
        SellerWalletTransaction sellerWalletTransaction2 = new SellerWalletTransaction();
        sellerWalletTransaction2.setId(sellerWalletTransaction1.getId());
        assertThat(sellerWalletTransaction1).isEqualTo(sellerWalletTransaction2);
        sellerWalletTransaction2.setId(2L);
        assertThat(sellerWalletTransaction1).isNotEqualTo(sellerWalletTransaction2);
        sellerWalletTransaction1.setId(null);
        assertThat(sellerWalletTransaction1).isNotEqualTo(sellerWalletTransaction2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SellerWalletTransactionDTO.class);
        SellerWalletTransactionDTO sellerWalletTransactionDTO1 = new SellerWalletTransactionDTO();
        sellerWalletTransactionDTO1.setId(1L);
        SellerWalletTransactionDTO sellerWalletTransactionDTO2 = new SellerWalletTransactionDTO();
        assertThat(sellerWalletTransactionDTO1).isNotEqualTo(sellerWalletTransactionDTO2);
        sellerWalletTransactionDTO2.setId(sellerWalletTransactionDTO1.getId());
        assertThat(sellerWalletTransactionDTO1).isEqualTo(sellerWalletTransactionDTO2);
        sellerWalletTransactionDTO2.setId(2L);
        assertThat(sellerWalletTransactionDTO1).isNotEqualTo(sellerWalletTransactionDTO2);
        sellerWalletTransactionDTO1.setId(null);
        assertThat(sellerWalletTransactionDTO1).isNotEqualTo(sellerWalletTransactionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(sellerWalletTransactionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(sellerWalletTransactionMapper.fromId(null)).isNull();
    }
}
