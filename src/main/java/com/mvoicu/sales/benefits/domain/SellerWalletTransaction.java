package com.mvoicu.sales.benefits.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import com.mvoicu.sales.benefits.domain.enumeration.WalletTransactionType;

/**
 * A SellerWalletTransaction.
 */
@Entity
@Table(name = "seller_wallet_transaction")
public class SellerWalletTransaction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "amount")
    private Double amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "transaction_type")
    private WalletTransactionType transactionType;

    @Column(name = "transaction_date")
    private Instant transactionDate;

    @ManyToOne
    @JsonIgnoreProperties("")
    private SellerWallet sellerWallet;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAmount() {
        return amount;
    }

    public SellerWalletTransaction amount(Double amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public WalletTransactionType getTransactionType() {
        return transactionType;
    }

    public SellerWalletTransaction transactionType(WalletTransactionType transactionType) {
        this.transactionType = transactionType;
        return this;
    }

    public void setTransactionType(WalletTransactionType transactionType) {
        this.transactionType = transactionType;
    }

    public Instant getTransactionDate() {
        return transactionDate;
    }

    public SellerWalletTransaction transactionDate(Instant transactionDate) {
        this.transactionDate = transactionDate;
        return this;
    }

    public void setTransactionDate(Instant transactionDate) {
        this.transactionDate = transactionDate;
    }

    public SellerWallet getSellerWallet() {
        return sellerWallet;
    }

    public SellerWalletTransaction sellerWallet(SellerWallet sellerWallet) {
        this.sellerWallet = sellerWallet;
        return this;
    }

    public void setSellerWallet(SellerWallet sellerWallet) {
        this.sellerWallet = sellerWallet;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SellerWalletTransaction sellerWalletTransaction = (SellerWalletTransaction) o;
        if (sellerWalletTransaction.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sellerWalletTransaction.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SellerWalletTransaction{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", transactionType='" + getTransactionType() + "'" +
            ", transactionDate='" + getTransactionDate() + "'" +
            "}";
    }
}
