package com.mvoicu.sales.benefits.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Seller entity.
 */
public class SellerDTO implements Serializable {

    private Long id;

    private Boolean isActive;

    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SellerDTO sellerDTO = (SellerDTO) o;
        if (sellerDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sellerDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SellerDTO{" +
            "id=" + getId() +
            ", isActive='" + isIsActive() + "'" +
            ", user=" + getUserId() +
            "}";
    }
}
