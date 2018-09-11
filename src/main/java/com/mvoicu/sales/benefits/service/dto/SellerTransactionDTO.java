package com.mvoicu.sales.benefits.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the SellerTransaction entity.
 */
public class SellerTransactionDTO implements Serializable {

    private Long id;

    private Boolean confirmed;

    private Long amount;

    private Instant transactionDate;

    private Long campaignProductId;

    private Long sellerId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isConfirmed() {
        return confirmed;
    }

    public void setConfirmed(Boolean confirmed) {
        this.confirmed = confirmed;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public Instant getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(Instant transactionDate) {
        this.transactionDate = transactionDate;
    }

    public Long getCampaignProductId() {
        return campaignProductId;
    }

    public void setCampaignProductId(Long campaignProductId) {
        this.campaignProductId = campaignProductId;
    }

    public Long getSellerId() {
        return sellerId;
    }

    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SellerTransactionDTO sellerTransactionDTO = (SellerTransactionDTO) o;
        if (sellerTransactionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sellerTransactionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SellerTransactionDTO{" +
            "id=" + getId() +
            ", confirmed='" + isConfirmed() + "'" +
            ", amount=" + getAmount() +
            ", transactionDate='" + getTransactionDate() + "'" +
            ", campaignProduct=" + getCampaignProductId() +
            ", seller=" + getSellerId() +
            "}";
    }
}
