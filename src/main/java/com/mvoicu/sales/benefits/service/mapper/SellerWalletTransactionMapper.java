package com.mvoicu.sales.benefits.service.mapper;

import com.mvoicu.sales.benefits.domain.*;
import com.mvoicu.sales.benefits.service.dto.SellerWalletTransactionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SellerWalletTransaction and its DTO SellerWalletTransactionDTO.
 */
@Mapper(componentModel = "spring", uses = {SellerWalletMapper.class})
public interface SellerWalletTransactionMapper extends EntityMapper<SellerWalletTransactionDTO, SellerWalletTransaction> {

    @Mapping(source = "sellerWallet.id", target = "sellerWalletId")
    SellerWalletTransactionDTO toDto(SellerWalletTransaction sellerWalletTransaction);

    @Mapping(source = "sellerWalletId", target = "sellerWallet")
    SellerWalletTransaction toEntity(SellerWalletTransactionDTO sellerWalletTransactionDTO);

    default SellerWalletTransaction fromId(Long id) {
        if (id == null) {
            return null;
        }
        SellerWalletTransaction sellerWalletTransaction = new SellerWalletTransaction();
        sellerWalletTransaction.setId(id);
        return sellerWalletTransaction;
    }
}
