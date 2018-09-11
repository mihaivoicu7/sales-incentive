package com.mvoicu.sales.benefits.web.rest;

import com.mvoicu.sales.benefits.SalesBenefitApp;

import com.mvoicu.sales.benefits.domain.SellerTransaction;
import com.mvoicu.sales.benefits.repository.SellerTransactionRepository;
import com.mvoicu.sales.benefits.service.SellerTransactionService;
import com.mvoicu.sales.benefits.service.dto.SellerTransactionDTO;
import com.mvoicu.sales.benefits.service.mapper.SellerTransactionMapper;
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

/**
 * Test class for the SellerTransactionResource REST controller.
 *
 * @see SellerTransactionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SalesBenefitApp.class)
public class SellerTransactionResourceIntTest {

    private static final Boolean DEFAULT_CONFIRMED = false;
    private static final Boolean UPDATED_CONFIRMED = true;

    private static final Long DEFAULT_AMOUNT = 1L;
    private static final Long UPDATED_AMOUNT = 2L;

    private static final Instant DEFAULT_TRANSACTION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TRANSACTION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private SellerTransactionRepository sellerTransactionRepository;

    @Autowired
    private SellerTransactionMapper sellerTransactionMapper;
    
    @Autowired
    private SellerTransactionService sellerTransactionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSellerTransactionMockMvc;

    private SellerTransaction sellerTransaction;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SellerTransactionResource sellerTransactionResource = new SellerTransactionResource(sellerTransactionService);
        this.restSellerTransactionMockMvc = MockMvcBuilders.standaloneSetup(sellerTransactionResource)
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
    public static SellerTransaction createEntity(EntityManager em) {
        SellerTransaction sellerTransaction = new SellerTransaction()
            .confirmed(DEFAULT_CONFIRMED)
            .amount(DEFAULT_AMOUNT)
            .transactionDate(DEFAULT_TRANSACTION_DATE);
        return sellerTransaction;
    }

    @Before
    public void initTest() {
        sellerTransaction = createEntity(em);
    }

    @Test
    @Transactional
    public void createSellerTransaction() throws Exception {
        int databaseSizeBeforeCreate = sellerTransactionRepository.findAll().size();

        // Create the SellerTransaction
        SellerTransactionDTO sellerTransactionDTO = sellerTransactionMapper.toDto(sellerTransaction);
        restSellerTransactionMockMvc.perform(post("/api/seller-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sellerTransactionDTO)))
            .andExpect(status().isCreated());

        // Validate the SellerTransaction in the database
        List<SellerTransaction> sellerTransactionList = sellerTransactionRepository.findAll();
        assertThat(sellerTransactionList).hasSize(databaseSizeBeforeCreate + 1);
        SellerTransaction testSellerTransaction = sellerTransactionList.get(sellerTransactionList.size() - 1);
        assertThat(testSellerTransaction.isConfirmed()).isEqualTo(DEFAULT_CONFIRMED);
        assertThat(testSellerTransaction.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testSellerTransaction.getTransactionDate()).isEqualTo(DEFAULT_TRANSACTION_DATE);
    }

    @Test
    @Transactional
    public void createSellerTransactionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sellerTransactionRepository.findAll().size();

        // Create the SellerTransaction with an existing ID
        sellerTransaction.setId(1L);
        SellerTransactionDTO sellerTransactionDTO = sellerTransactionMapper.toDto(sellerTransaction);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSellerTransactionMockMvc.perform(post("/api/seller-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sellerTransactionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SellerTransaction in the database
        List<SellerTransaction> sellerTransactionList = sellerTransactionRepository.findAll();
        assertThat(sellerTransactionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSellerTransactions() throws Exception {
        // Initialize the database
        sellerTransactionRepository.saveAndFlush(sellerTransaction);

        // Get all the sellerTransactionList
        restSellerTransactionMockMvc.perform(get("/api/seller-transactions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sellerTransaction.getId().intValue())))
            .andExpect(jsonPath("$.[*].confirmed").value(hasItem(DEFAULT_CONFIRMED.booleanValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].transactionDate").value(hasItem(DEFAULT_TRANSACTION_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getSellerTransaction() throws Exception {
        // Initialize the database
        sellerTransactionRepository.saveAndFlush(sellerTransaction);

        // Get the sellerTransaction
        restSellerTransactionMockMvc.perform(get("/api/seller-transactions/{id}", sellerTransaction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sellerTransaction.getId().intValue()))
            .andExpect(jsonPath("$.confirmed").value(DEFAULT_CONFIRMED.booleanValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()))
            .andExpect(jsonPath("$.transactionDate").value(DEFAULT_TRANSACTION_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSellerTransaction() throws Exception {
        // Get the sellerTransaction
        restSellerTransactionMockMvc.perform(get("/api/seller-transactions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSellerTransaction() throws Exception {
        // Initialize the database
        sellerTransactionRepository.saveAndFlush(sellerTransaction);

        int databaseSizeBeforeUpdate = sellerTransactionRepository.findAll().size();

        // Update the sellerTransaction
        SellerTransaction updatedSellerTransaction = sellerTransactionRepository.findById(sellerTransaction.getId()).get();
        // Disconnect from session so that the updates on updatedSellerTransaction are not directly saved in db
        em.detach(updatedSellerTransaction);
        updatedSellerTransaction
            .confirmed(UPDATED_CONFIRMED)
            .amount(UPDATED_AMOUNT)
            .transactionDate(UPDATED_TRANSACTION_DATE);
        SellerTransactionDTO sellerTransactionDTO = sellerTransactionMapper.toDto(updatedSellerTransaction);

        restSellerTransactionMockMvc.perform(put("/api/seller-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sellerTransactionDTO)))
            .andExpect(status().isOk());

        // Validate the SellerTransaction in the database
        List<SellerTransaction> sellerTransactionList = sellerTransactionRepository.findAll();
        assertThat(sellerTransactionList).hasSize(databaseSizeBeforeUpdate);
        SellerTransaction testSellerTransaction = sellerTransactionList.get(sellerTransactionList.size() - 1);
        assertThat(testSellerTransaction.isConfirmed()).isEqualTo(UPDATED_CONFIRMED);
        assertThat(testSellerTransaction.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testSellerTransaction.getTransactionDate()).isEqualTo(UPDATED_TRANSACTION_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingSellerTransaction() throws Exception {
        int databaseSizeBeforeUpdate = sellerTransactionRepository.findAll().size();

        // Create the SellerTransaction
        SellerTransactionDTO sellerTransactionDTO = sellerTransactionMapper.toDto(sellerTransaction);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSellerTransactionMockMvc.perform(put("/api/seller-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sellerTransactionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SellerTransaction in the database
        List<SellerTransaction> sellerTransactionList = sellerTransactionRepository.findAll();
        assertThat(sellerTransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSellerTransaction() throws Exception {
        // Initialize the database
        sellerTransactionRepository.saveAndFlush(sellerTransaction);

        int databaseSizeBeforeDelete = sellerTransactionRepository.findAll().size();

        // Get the sellerTransaction
        restSellerTransactionMockMvc.perform(delete("/api/seller-transactions/{id}", sellerTransaction.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SellerTransaction> sellerTransactionList = sellerTransactionRepository.findAll();
        assertThat(sellerTransactionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SellerTransaction.class);
        SellerTransaction sellerTransaction1 = new SellerTransaction();
        sellerTransaction1.setId(1L);
        SellerTransaction sellerTransaction2 = new SellerTransaction();
        sellerTransaction2.setId(sellerTransaction1.getId());
        assertThat(sellerTransaction1).isEqualTo(sellerTransaction2);
        sellerTransaction2.setId(2L);
        assertThat(sellerTransaction1).isNotEqualTo(sellerTransaction2);
        sellerTransaction1.setId(null);
        assertThat(sellerTransaction1).isNotEqualTo(sellerTransaction2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SellerTransactionDTO.class);
        SellerTransactionDTO sellerTransactionDTO1 = new SellerTransactionDTO();
        sellerTransactionDTO1.setId(1L);
        SellerTransactionDTO sellerTransactionDTO2 = new SellerTransactionDTO();
        assertThat(sellerTransactionDTO1).isNotEqualTo(sellerTransactionDTO2);
        sellerTransactionDTO2.setId(sellerTransactionDTO1.getId());
        assertThat(sellerTransactionDTO1).isEqualTo(sellerTransactionDTO2);
        sellerTransactionDTO2.setId(2L);
        assertThat(sellerTransactionDTO1).isNotEqualTo(sellerTransactionDTO2);
        sellerTransactionDTO1.setId(null);
        assertThat(sellerTransactionDTO1).isNotEqualTo(sellerTransactionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(sellerTransactionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(sellerTransactionMapper.fromId(null)).isNull();
    }
}
