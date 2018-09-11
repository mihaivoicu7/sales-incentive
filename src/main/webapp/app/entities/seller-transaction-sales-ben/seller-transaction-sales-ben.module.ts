import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SalesBenefitSharedModule } from 'app/shared';
import {
    SellerTransactionSalesBenComponent,
    SellerTransactionSalesBenDetailComponent,
    SellerTransactionSalesBenUpdateComponent,
    SellerTransactionSalesBenDeletePopupComponent,
    SellerTransactionSalesBenDeleteDialogComponent,
    sellerTransactionRoute,
    sellerTransactionPopupRoute
} from './';

const ENTITY_STATES = [...sellerTransactionRoute, ...sellerTransactionPopupRoute];

@NgModule({
    imports: [SalesBenefitSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SellerTransactionSalesBenComponent,
        SellerTransactionSalesBenDetailComponent,
        SellerTransactionSalesBenUpdateComponent,
        SellerTransactionSalesBenDeleteDialogComponent,
        SellerTransactionSalesBenDeletePopupComponent
    ],
    entryComponents: [
        SellerTransactionSalesBenComponent,
        SellerTransactionSalesBenUpdateComponent,
        SellerTransactionSalesBenDeleteDialogComponent,
        SellerTransactionSalesBenDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalesBenefitSellerTransactionSalesBenModule {}
