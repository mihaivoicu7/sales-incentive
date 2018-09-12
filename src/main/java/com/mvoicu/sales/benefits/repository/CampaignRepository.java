package com.mvoicu.sales.benefits.repository;

import com.mvoicu.sales.benefits.domain.Campaign;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the Campaign entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CampaignRepository extends JpaRepository<Campaign, Long> {

    Page<Campaign> findAllBySupplierUserLogin(String login, Pageable pageable);

    Optional<Campaign> findByIdAndSupplierUserLogin(Long id, String login);

    void deleteByIdAndSupplierUserLogin(Long id, String login);

}
