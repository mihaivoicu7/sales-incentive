import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SalesBenefitSharedModule } from 'app/shared';
import {
    SupplierCampaignComponent,
    SupplierCampaignDetailComponent,
    SupplierCampaignUpdateComponent,
    SupplierCampaignDeletePopupComponent,
    SupplierCampaignDeleteDialogComponent,
    supplierCampaignRoute,
    campaignPopupRoute
} from './';

const ENTITY_STATES = [...supplierCampaignRoute, ...campaignPopupRoute];

@NgModule({
    imports: [SalesBenefitSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SupplierCampaignComponent,
        SupplierCampaignDetailComponent,
        SupplierCampaignUpdateComponent,
        SupplierCampaignDeleteDialogComponent,
        SupplierCampaignDeletePopupComponent
    ],
    entryComponents: [
        SupplierCampaignComponent,
        SupplierCampaignUpdateComponent,
        SupplierCampaignDeleteDialogComponent,
        SupplierCampaignDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalesBenefitCampaignModule {}
