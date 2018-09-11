package com.mvoicu.sales.benefits.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;
import com.mvoicu.sales.benefits.domain.enumeration.WalletTransactionType;

/**
 * A DTO for the SellerWalletTransaction entity.
 */
public class SellerWalletTransactionDTO implements Serializable {

    private Long id;

    private Double amount;

    private WalletTransactionType transactionType;

    private Instant transactionDate;

    private Long sellerWalletId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public WalletTransactionType getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(WalletTransactionType transactionType) {
        this.transactionType = transactionType;
    }

    public Instant getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(Instant transactionDate) {
        this.transactionDate = transactionDate;
    }

    public Long getSellerWalletId() {
        return sellerWalletId;
    }

    public void setSellerWalletId(Long sellerWalletId) {
        this.sellerWalletId = sellerWalletId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SellerWalletTransactionDTO sellerWalletTransactionDTO = (SellerWalletTransactionDTO) o;
        if (sellerWalletTransactionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sellerWalletTransactionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SellerWalletTransactionDTO{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", transactionType='" + getTransactionType() + "'" +
            ", transactionDate='" + getTransactionDate() + "'" +
            ", sellerWallet=" + getSellerWalletId() +
            "}";
    }
}
