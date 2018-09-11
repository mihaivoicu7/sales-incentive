package com.mvoicu.sales.benefits.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A SellerWallet.
 */
@Entity
@Table(name = "seller_wallet")
public class SellerWallet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "available_amount")
    private Double availableAmount;

    @Column(name = "in_pending_amount")
    private Double inPendingAmount;

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

    public Double getAvailableAmount() {
        return availableAmount;
    }

    public SellerWallet availableAmount(Double availableAmount) {
        this.availableAmount = availableAmount;
        return this;
    }

    public void setAvailableAmount(Double availableAmount) {
        this.availableAmount = availableAmount;
    }

    public Double getInPendingAmount() {
        return inPendingAmount;
    }

    public SellerWallet inPendingAmount(Double inPendingAmount) {
        this.inPendingAmount = inPendingAmount;
        return this;
    }

    public void setInPendingAmount(Double inPendingAmount) {
        this.inPendingAmount = inPendingAmount;
    }

    public Seller getSeller() {
        return seller;
    }

    public SellerWallet seller(Seller seller) {
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
        SellerWallet sellerWallet = (SellerWallet) o;
        if (sellerWallet.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sellerWallet.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SellerWallet{" +
            "id=" + getId() +
            ", availableAmount=" + getAvailableAmount() +
            ", inPendingAmount=" + getInPendingAmount() +
            "}";
    }
}
