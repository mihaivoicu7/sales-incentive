import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SalesBenefitSharedModule } from 'app/shared';
import {
    ProductSalesBenComponent,
    ProductSalesBenDetailComponent,
    ProductSalesBenUpdateComponent,
    ProductSalesBenDeletePopupComponent,
    ProductSalesBenDeleteDialogComponent,
    productRoute,
    productPopupRoute
} from './';

const ENTITY_STATES = [...productRoute, ...productPopupRoute];

@NgModule({
    imports: [SalesBenefitSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProductSalesBenComponent,
        ProductSalesBenDetailComponent,
        ProductSalesBenUpdateComponent,
        ProductSalesBenDeleteDialogComponent,
        ProductSalesBenDeletePopupComponent
    ],
    entryComponents: [
        ProductSalesBenComponent,
        ProductSalesBenUpdateComponent,
        ProductSalesBenDeleteDialogComponent,
        ProductSalesBenDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalesBenefitProductSalesBenModule {}
