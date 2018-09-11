import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SalesBenefitSharedModule } from 'app/shared';
import { SalesBenefitAdminModule } from 'app/admin/admin.module';
import {
    SupplierSalesBenComponent,
    SupplierSalesBenDetailComponent,
    SupplierSalesBenUpdateComponent,
    SupplierSalesBenDeletePopupComponent,
    SupplierSalesBenDeleteDialogComponent,
    supplierRoute,
    supplierPopupRoute
} from './';

const ENTITY_STATES = [...supplierRoute, ...supplierPopupRoute];

@NgModule({
    imports: [SalesBenefitSharedModule, SalesBenefitAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SupplierSalesBenComponent,
        SupplierSalesBenDetailComponent,
        SupplierSalesBenUpdateComponent,
        SupplierSalesBenDeleteDialogComponent,
        SupplierSalesBenDeletePopupComponent
    ],
    entryComponents: [
        SupplierSalesBenComponent,
        SupplierSalesBenUpdateComponent,
        SupplierSalesBenDeleteDialogComponent,
        SupplierSalesBenDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalesBenefitSupplierSalesBenModule {}
