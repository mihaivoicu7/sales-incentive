import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SalesBenefitSharedModule } from 'app/shared';
import {
    SellerWalletSalesBenComponent,
    SellerWalletSalesBenDetailComponent,
    SellerWalletSalesBenUpdateComponent,
    SellerWalletSalesBenDeletePopupComponent,
    SellerWalletSalesBenDeleteDialogComponent,
    sellerWalletRoute,
    sellerWalletPopupRoute
} from './';

const ENTITY_STATES = [...sellerWalletRoute, ...sellerWalletPopupRoute];

@NgModule({
    imports: [SalesBenefitSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SellerWalletSalesBenComponent,
        SellerWalletSalesBenDetailComponent,
        SellerWalletSalesBenUpdateComponent,
        SellerWalletSalesBenDeleteDialogComponent,
        SellerWalletSalesBenDeletePopupComponent
    ],
    entryComponents: [
        SellerWalletSalesBenComponent,
        SellerWalletSalesBenUpdateComponent,
        SellerWalletSalesBenDeleteDialogComponent,
        SellerWalletSalesBenDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalesBenefitSellerWalletSalesBenModule {}
