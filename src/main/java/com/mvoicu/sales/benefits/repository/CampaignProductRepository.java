package com.mvoicu.sales.benefits.repository;

import com.mvoicu.sales.benefits.domain.CampaignProduct;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CampaignProduct entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CampaignProductRepository extends JpaRepository<CampaignProduct, Long> {

}
