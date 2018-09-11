import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SalesBenefitSharedModule } from 'app/shared';
import { SalesBenefitAdminModule } from 'app/admin/admin.module';
import {
    SellerSalesBenComponent,
    SellerSalesBenDetailComponent,
    SellerSalesBenUpdateComponent,
    SellerSalesBenDeletePopupComponent,
    SellerSalesBenDeleteDialogComponent,
    sellerRoute,
    sellerPopupRoute
} from './';

const ENTITY_STATES = [...sellerRoute, ...sellerPopupRoute];

@NgModule({
    imports: [SalesBenefitSharedModule, SalesBenefitAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SellerSalesBenComponent,
        SellerSalesBenDetailComponent,
        SellerSalesBenUpdateComponent,
        SellerSalesBenDeleteDialogComponent,
        SellerSalesBenDeletePopupComponent
    ],
    entryComponents: [
        SellerSalesBenComponent,
        SellerSalesBenUpdateComponent,
        SellerSalesBenDeleteDialogComponent,
        SellerSalesBenDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalesBenefitSellerSalesBenModule {}
