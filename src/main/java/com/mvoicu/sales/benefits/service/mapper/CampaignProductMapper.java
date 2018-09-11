package com.mvoicu.sales.benefits.service.mapper;

import com.mvoicu.sales.benefits.domain.*;
import com.mvoicu.sales.benefits.service.dto.CampaignProductDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CampaignProduct and its DTO CampaignProductDTO.
 */
@Mapper(componentModel = "spring", uses = {CampaignMapper.class, ProductMapper.class})
public interface CampaignProductMapper extends EntityMapper<CampaignProductDTO, CampaignProduct> {

    @Mapping(source = "campaign.id", target = "campaignId")
    @Mapping(source = "product.id", target = "productId")
    CampaignProductDTO toDto(CampaignProduct campaignProduct);

    @Mapping(source = "campaignId", target = "campaign")
    @Mapping(source = "productId", target = "product")
    CampaignProduct toEntity(CampaignProductDTO campaignProductDTO);

    default CampaignProduct fromId(Long id) {
        if (id == null) {
            return null;
        }
        CampaignProduct campaignProduct = new CampaignProduct();
        campaignProduct.setId(id);
        return campaignProduct;
    }
}
