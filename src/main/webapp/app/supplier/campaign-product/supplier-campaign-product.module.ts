import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SalesBenefitSharedModule} from 'app/shared';
import {
    supplierCampaignProductRoute,
    SupplierCampaignProductComponent
} from './';

const ENTITY_STATES = [...supplierCampaignProductRoute];

@NgModule({
    imports: [SalesBenefitSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SupplierCampaignProductComponent,
    ],
    entryComponents: [
        SupplierCampaignProductComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SupplierCampaignProductModule {}
