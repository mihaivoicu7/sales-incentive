import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SalesBenefitProductSalesBenModule } from './product-sales-ben/product-sales-ben.module';
import { SalesBenefitCampaignSalesBenModule } from './campaign-sales-ben/campaign-sales-ben.module';
import { SalesBenefitCampaignProductSalesBenModule } from './campaign-product-sales-ben/campaign-product-sales-ben.module';
import { SalesBenefitSellerSalesBenModule } from './seller-sales-ben/seller-sales-ben.module';
import { SalesBenefitSellerTransactionSalesBenModule } from './seller-transaction-sales-ben/seller-transaction-sales-ben.module';
import { SalesBenefitSellerWalletSalesBenModule } from './seller-wallet-sales-ben/seller-wallet-sales-ben.module';
import { SalesBenefitSellerWalletTransactionSalesBenModule } from './seller-wallet-transaction-sales-ben/seller-wallet-transaction-sales-ben.module';
import { SalesBenefitSupplierSalesBenModule } from './supplier-sales-ben/supplier-sales-ben.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        SalesBenefitProductSalesBenModule,
        SalesBenefitCampaignSalesBenModule,
        SalesBenefitCampaignProductSalesBenModule,
        SalesBenefitSellerSalesBenModule,
        SalesBenefitSellerTransactionSalesBenModule,
        SalesBenefitSellerWalletSalesBenModule,
        SalesBenefitSellerWalletTransactionSalesBenModule,
        SalesBenefitSupplierSalesBenModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalesBenefitEntityModule {}
