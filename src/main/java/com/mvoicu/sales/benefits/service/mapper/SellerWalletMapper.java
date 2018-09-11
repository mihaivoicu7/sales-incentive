package com.mvoicu.sales.benefits.service.mapper;

import com.mvoicu.sales.benefits.domain.*;
import com.mvoicu.sales.benefits.service.dto.SellerWalletDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SellerWallet and its DTO SellerWalletDTO.
 */
@Mapper(componentModel = "spring", uses = {SellerMapper.class})
public interface SellerWalletMapper extends EntityMapper<SellerWalletDTO, SellerWallet> {

    @Mapping(source = "seller.id", target = "sellerId")
    SellerWalletDTO toDto(SellerWallet sellerWallet);

    @Mapping(source = "sellerId", target = "seller")
    SellerWallet toEntity(SellerWalletDTO sellerWalletDTO);

    default SellerWallet fromId(Long id) {
        if (id == null) {
            return null;
        }
        SellerWallet sellerWallet = new SellerWallet();
        sellerWallet.setId(id);
        return sellerWallet;
    }
}
