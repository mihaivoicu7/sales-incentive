package com.mvoicu.sales.benefits.service.mapper;

import com.mvoicu.sales.benefits.domain.*;
import com.mvoicu.sales.benefits.service.dto.CampaignDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Campaign and its DTO CampaignDTO.
 */
@Mapper(componentModel = "spring", uses = {SupplierMapper.class})
public interface CampaignMapper extends EntityMapper<CampaignDTO, Campaign> {

    @Mapping(source = "supplier.id", target = "supplierId")
    CampaignDTO toDto(Campaign campaign);

    @Mapping(source = "supplierId", target = "supplier")
    Campaign toEntity(CampaignDTO campaignDTO);

    default Campaign fromId(Long id) {
        if (id == null) {
            return null;
        }
        Campaign campaign = new Campaign();
        campaign.setId(id);
        return campaign;
    }
}
