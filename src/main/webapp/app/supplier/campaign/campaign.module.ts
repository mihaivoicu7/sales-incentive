import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SalesBenefitSharedModule } from 'app/shared';
import {
    CampaignComponent,
    CampaignDetailComponent,
    CampaignUpdateComponent,
    CampaignSalesBenDeletePopupComponent,
    CampaignDeleteDialogComponent,
    campaignRoute,
    campaignPopupRoute
} from './';

const ENTITY_STATES = [...campaignRoute, ...campaignPopupRoute];

@NgModule({
    imports: [SalesBenefitSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CampaignComponent,
        CampaignDetailComponent,
        CampaignUpdateComponent,
        CampaignDeleteDialogComponent,
        CampaignSalesBenDeletePopupComponent
    ],
    entryComponents: [
        CampaignComponent,
        CampaignUpdateComponent,
        CampaignDeleteDialogComponent,
        CampaignSalesBenDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalesBenefitCampaignModule {}
