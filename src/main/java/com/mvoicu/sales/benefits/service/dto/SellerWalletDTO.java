package com.mvoicu.sales.benefits.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the SellerWallet entity.
 */
public class SellerWalletDTO implements Serializable {

    private Long id;

    private Double availableAmount;

    private Double inPendingAmount;

    private Long sellerId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAvailableAmount() {
        return availableAmount;
    }

    public void setAvailableAmount(Double availableAmount) {
        this.availableAmount = availableAmount;
    }

    public Double getInPendingAmount() {
        return inPendingAmount;
    }

    public void setInPendingAmount(Double inPendingAmount) {
        this.inPendingAmount = inPendingAmount;
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

        SellerWalletDTO sellerWalletDTO = (SellerWalletDTO) o;
        if (sellerWalletDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sellerWalletDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SellerWalletDTO{" +
            "id=" + getId() +
            ", availableAmount=" + getAvailableAmount() +
            ", inPendingAmount=" + getInPendingAmount() +
            ", seller=" + getSellerId() +
            "}";
    }
}
