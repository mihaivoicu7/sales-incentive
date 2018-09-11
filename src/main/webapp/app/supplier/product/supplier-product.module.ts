import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SalesBenefitSharedModule } from 'app/shared';
import {
    SupplierProductComponent,
    supplierProductRoute,
    SupplierProductUpdateComponent,
} from '.';

const ENTITY_STATES = [...supplierProductRoute];

@NgModule({
    imports: [SalesBenefitSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SupplierProductComponent,
        SupplierProductUpdateComponent,
    ],
    entryComponents: [
        SupplierProductComponent,
        SupplierProductUpdateComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SupplierProductModule {}
