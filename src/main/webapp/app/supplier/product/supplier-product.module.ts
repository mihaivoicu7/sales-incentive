import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SalesBenefitSharedModule } from 'app/shared';
import {
    SupplierProductComponent,
    supplierProductRoute,
    SupplierProductUpdateComponent,
    SupplierProductDetailComponent,
    SupplierProductDeleteDialogComponent,
} from '.';

const ENTITY_STATES = [...supplierProductRoute];

@NgModule({
    imports: [SalesBenefitSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SupplierProductComponent,
        SupplierProductUpdateComponent,
        SupplierProductDetailComponent,
        SupplierProductDeleteDialogComponent,
    ],
    entryComponents: [
        SupplierProductComponent,
        SupplierProductUpdateComponent,
        SupplierProductDetailComponent,
        SupplierProductDeleteDialogComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SupplierProductModule {}
