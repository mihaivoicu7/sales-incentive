import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SalesBenefitSharedModule } from 'app/shared';
import {
    SellerWalletTransactionSalesBenComponent,
    SellerWalletTransactionSalesBenDetailComponent,
    SellerWalletTransactionSalesBenUpdateComponent,
    SellerWalletTransactionSalesBenDeletePopupComponent,
    SellerWalletTransactionSalesBenDeleteDialogComponent,
    sellerWalletTransactionRoute,
    sellerWalletTransactionPopupRoute
} from './';

const ENTITY_STATES = [...sellerWalletTransactionRoute, ...sellerWalletTransactionPopupRoute];

@NgModule({
    imports: [SalesBenefitSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SellerWalletTransactionSalesBenComponent,
        SellerWalletTransactionSalesBenDetailComponent,
        SellerWalletTransactionSalesBenUpdateComponent,
        SellerWalletTransactionSalesBenDeleteDialogComponent,
        SellerWalletTransactionSalesBenDeletePopupComponent
    ],
    entryComponents: [
        SellerWalletTransactionSalesBenComponent,
        SellerWalletTransactionSalesBenUpdateComponent,
        SellerWalletTransactionSalesBenDeleteDialogComponent,
        SellerWalletTransactionSalesBenDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalesBenefitSellerWalletTransactionSalesBenModule {}
