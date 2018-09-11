package com.mvoicu.sales.benefits.service.mapper;

import com.mvoicu.sales.benefits.domain.*;
import com.mvoicu.sales.benefits.service.dto.SellerTransactionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SellerTransaction and its DTO SellerTransactionDTO.
 */
@Mapper(componentModel = "spring", uses = {CampaignProductMapper.class, SellerMapper.class})
public interface SellerTransactionMapper extends EntityMapper<SellerTransactionDTO, SellerTransaction> {

    @Mapping(source = "campaignProduct.id", target = "campaignProductId")
    @Mapping(source = "seller.id", target = "sellerId")
    SellerTransactionDTO toDto(SellerTransaction sellerTransaction);

    @Mapping(source = "campaignProductId", target = "campaignProduct")
    @Mapping(source = "sellerId", target = "seller")
    SellerTransaction toEntity(SellerTransactionDTO sellerTransactionDTO);

    default SellerTransaction fromId(Long id) {
        if (id == null) {
            return null;
        }
        SellerTransaction sellerTransaction = new SellerTransaction();
        sellerTransaction.setId(id);
        return sellerTransaction;
    }
}
