package com.mvoicu.sales.benefits.service.mapper;

import com.mvoicu.sales.benefits.domain.*;
import com.mvoicu.sales.benefits.service.dto.SupplierDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Supplier and its DTO SupplierDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface SupplierMapper extends EntityMapper<SupplierDTO, Supplier> {

    @Mapping(source = "user.id", target = "userId")
    SupplierDTO toDto(Supplier supplier);

    @Mapping(source = "userId", target = "user")
    Supplier toEntity(SupplierDTO supplierDTO);

    default Supplier fromId(Long id) {
        if (id == null) {
            return null;
        }
        Supplier supplier = new Supplier();
        supplier.setId(id);
        return supplier;
    }
}
