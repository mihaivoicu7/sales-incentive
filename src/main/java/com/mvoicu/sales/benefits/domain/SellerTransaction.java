package com.mvoicu.sales.benefits.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A SellerTransaction.
 */
@Entity
@Table(name = "seller_transaction")
public class SellerTransaction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "confirmed")
    private Boolean confirmed;

    @Column(name = "amount")
    private Long amount;

    @Column(name = "transaction_date")
    private Instant transactionDate;

    @ManyToOne
    @JsonIgnoreProperties("")
    private CampaignProduct campaignProduct;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Seller seller;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isConfirmed() {
        return confirmed;
    }

    public SellerTransaction confirmed(Boolean confirmed) {
        this.confirmed = confirmed;
        return this;
    }

    public void setConfirmed(Boolean confirmed) {
        this.confirmed = confirmed;
    }

    public Long getAmount() {
        return amount;
    }

    public SellerTransaction amount(Long amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public Instant getTransactionDate() {
        return transactionDate;
    }

    public SellerTransaction transactionDate(Instant transactionDate) {
        this.transactionDate = transactionDate;
        return this;
    }

    public void setTransactionDate(Instant transactionDate) {
        this.transactionDate = transactionDate;
    }

    public CampaignProduct getCampaignProduct() {
        return campaignProduct;
    }

    public SellerTransaction campaignProduct(CampaignProduct campaignProduct) {
        this.campaignProduct = campaignProduct;
        return this;
    }

    public void setCampaignProduct(CampaignProduct campaignProduct) {
        this.campaignProduct = campaignProduct;
    }

    public Seller getSeller() {
        return seller;
    }

    public SellerTransaction seller(Seller seller) {
        this.seller = seller;
        return this;
    }

    public void setSeller(Seller seller) {
        this.seller = seller;
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
        SellerTransaction sellerTransaction = (SellerTransaction) o;
        if (sellerTransaction.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sellerTransaction.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SellerTransaction{" +
            "id=" + getId() +
            ", confirmed='" + isConfirmed() + "'" +
            ", amount=" + getAmount() +
            ", transactionDate='" + getTransactionDate() + "'" +
            "}";
    }
}
