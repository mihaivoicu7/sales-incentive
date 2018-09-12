import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SalesBenefitSharedModule } from 'app/shared';
import {
    SupplierProductComponent,
    supplierProductRoute,
    productPopupRoute,
    SupplierProductUpdateComponent,
    SupplierProductDetailComponent,
    SupplierProductDeleteDialogComponent,
} from '.';
import {SupplierProductDeletePopupComponent} from 'app/supplier/product/supplier-product-delete-dialog.component';

const ENTITY_STATES = [...supplierProductRoute, ...productPopupRoute];

@NgModule({
    imports: [SalesBenefitSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SupplierProductComponent,
        SupplierProductUpdateComponent,
        SupplierProductDetailComponent,
        SupplierProductDeletePopupComponent,
        SupplierProductDeleteDialogComponent,
    ],
    entryComponents: [
        SupplierProductComponent,
        SupplierProductUpdateComponent,
        SupplierProductDetailComponent,
        SupplierProductDeletePopupComponent,
        SupplierProductDeleteDialogComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SupplierProductModule {}
