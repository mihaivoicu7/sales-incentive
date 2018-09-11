package com.mvoicu.sales.benefits.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the CampaignProduct entity.
 */
public class CampaignProductDTO implements Serializable {

    private Long id;

    private Double price;

    private Boolean isActive;

    private Double discount;

    private Long campaignId;

    private Long productId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Boolean isIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Double getDiscount() {
        return discount;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }

    public Long getCampaignId() {
        return campaignId;
    }

    public void setCampaignId(Long campaignId) {
        this.campaignId = campaignId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CampaignProductDTO campaignProductDTO = (CampaignProductDTO) o;
        if (campaignProductDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), campaignProductDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CampaignProductDTO{" +
            "id=" + getId() +
            ", price=" + getPrice() +
            ", isActive='" + isIsActive() + "'" +
            ", discount=" + getDiscount() +
            ", campaign=" + getCampaignId() +
            ", product=" + getProductId() +
            "}";
    }
}
