package com.mvoicu.sales.benefits.service.mapper;

import com.mvoicu.sales.benefits.domain.*;
import com.mvoicu.sales.benefits.service.dto.SellerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Seller and its DTO SellerDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface SellerMapper extends EntityMapper<SellerDTO, Seller> {

    @Mapping(source = "user.id", target = "userId")
    SellerDTO toDto(Seller seller);

    @Mapping(source = "userId", target = "user")
    Seller toEntity(SellerDTO sellerDTO);

    default Seller fromId(Long id) {
        if (id == null) {
            return null;
        }
        Seller seller = new Seller();
        seller.setId(id);
        return seller;
    }
}
