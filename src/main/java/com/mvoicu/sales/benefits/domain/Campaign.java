package com.mvoicu.sales.benefits.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Campaign.
 */
@Entity
@Table(name = "campaign")
public class Campaign implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "campaign_name", nullable = false)
    private String campaignName;

    @Column(name = "from_date")
    private Instant fromDate = Instant.now();

    @Column(name = "to_date")
    private Instant toDate;

    @Column(name = "is_active")
    private Boolean isActive;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Supplier supplier;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCampaignName() {
        return campaignName;
    }

    public Campaign campaignName(String campaignName) {
        this.campaignName = campaignName;
        return this;
    }

    public void setCampaignName(String campaignName) {
        this.campaignName = campaignName;
    }

    public Instant getFromDate() {
        return fromDate;
    }

    public Campaign fromDate(Instant fromDate) {
        this.fromDate = fromDate;
        return this;
    }

    public void setFromDate(Instant fromDate) {
        this.fromDate = fromDate;
    }

    public Instant getToDate() {
        return toDate;
    }

    public Campaign toDate(Instant toDate) {
        this.toDate = toDate;
        return this;
    }

    public void setToDate(Instant toDate) {
        this.toDate = toDate;
    }

    public Boolean isIsActive() {
        return isActive;
    }

    public Campaign isActive(Boolean isActive) {
        this.isActive = isActive;
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public Campaign supplier(Supplier supplier) {
        this.supplier = supplier;
        return this;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
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
        Campaign campaign = (Campaign) o;
        if (campaign.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), campaign.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Campaign{" +
            "id=" + getId() +
            ", campaignName='" + getCampaignName() + "'" +
            ", fromDate='" + getFromDate() + "'" +
            ", toDate='" + getToDate() + "'" +
            ", isActive='" + isIsActive() + "'" +
            "}";
    }
}
