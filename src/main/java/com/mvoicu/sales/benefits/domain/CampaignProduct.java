package com.mvoicu.sales.benefits.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CampaignProduct.
 */
@Entity
@Table(name = "campaign_product")
public class CampaignProduct implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "price")
    private Double price;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "discount")
    private Double discount;

    @OneToOne
    @JoinColumn(unique = true)
    private Campaign campaign;

    @OneToOne
    @JoinColumn(unique = true)
    private Product product;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getPrice() {
        return price;
    }

    public CampaignProduct price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Boolean isIsActive() {
        return isActive;
    }

    public CampaignProduct isActive(Boolean isActive) {
        this.isActive = isActive;
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Double getDiscount() {
        return discount;
    }

    public CampaignProduct discount(Double discount) {
        this.discount = discount;
        return this;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }

    public Campaign getCampaign() {
        return campaign;
    }

    public CampaignProduct campaign(Campaign campaign) {
        this.campaign = campaign;
        return this;
    }

    public void setCampaign(Campaign campaign) {
        this.campaign = campaign;
    }

    public Product getProduct() {
        return product;
    }

    public CampaignProduct product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
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
        CampaignProduct campaignProduct = (CampaignProduct) o;
        if (campaignProduct.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), campaignProduct.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CampaignProduct{" +
            "id=" + getId() +
            ", price=" + getPrice() +
            ", isActive='" + isIsActive() + "'" +
            ", discount=" + getDiscount() +
            "}";
    }
}
