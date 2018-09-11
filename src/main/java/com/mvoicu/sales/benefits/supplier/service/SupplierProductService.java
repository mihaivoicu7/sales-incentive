package com.mvoicu.sales.benefits.supplier.service;

import com.mvoicu.sales.benefits.domain.Supplier;
import com.mvoicu.sales.benefits.repository.ProductRepository;
import com.mvoicu.sales.benefits.repository.SupplierRepository;
import com.mvoicu.sales.benefits.security.SecurityUtils;
import com.mvoicu.sales.benefits.service.ProductService;
import com.mvoicu.sales.benefits.service.SupplierService;
import com.mvoicu.sales.benefits.service.UserService;
import com.mvoicu.sales.benefits.service.dto.ProductDTO;
import com.mvoicu.sales.benefits.service.dto.SupplierDTO;
import com.mvoicu.sales.benefits.service.mapper.ProductMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class SupplierProductService {

    Logger log = LoggerFactory.getLogger(SupplierProductService.class);

    public SupplierProductService(ProductRepository productRepository, UserService userService, SupplierRepository supplierRepository, ProductService productService, ProductMapper productMapper, SupplierService supplierService) {
        this.productRepository = productRepository;
        this.userService = userService;
        this.supplierRepository = supplierRepository;
        this.productService = productService;
        this.productMapper = productMapper;
        this.supplierService = supplierService;
    }

    private final ProductRepository productRepository;

    private final UserService userService;

    private final SupplierRepository supplierRepository;

    private final ProductService productService;

    private final ProductMapper productMapper;

    private final SupplierService supplierService;

    public ProductDTO save(ProductDTO productDTO) throws Exception {
        productDTO.setSupplierId(supplierService.findCurrentSupplier().orElseThrow(() -> new Exception("Supplier not logged.")).getId());
        return productService.save(productDTO);
    }

    @Transactional(readOnly = true)
    public Page<ProductDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Products for supplier");
        return productRepository.findBySupplierUserLogin(SecurityUtils.getCurrentUserLogin().get(), pageable)
            .map(productMapper::toDto);
    }


    /**
     * Get one product by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ProductDTO> findOne(Long id) {
        log.debug("Request to get Product : {}", id);
        return productRepository.findByIdAndSupplierUserLogin(id, SecurityUtils.getCurrentUserLogin().get())
            .map(productMapper::toDto);
    }

    /**
     * Delete the product by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Supplier Product : {}", id);
        productRepository.deleteByIdAndSupplierUserLogin(id, SecurityUtils.getCurrentUserLogin().get());
    }
}
