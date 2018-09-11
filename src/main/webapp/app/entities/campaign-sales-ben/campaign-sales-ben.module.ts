import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SalesBenefitSharedModule } from 'app/shared';
import {
    CampaignSalesBenComponent,
    CampaignSalesBenDetailComponent,
    CampaignSalesBenUpdateComponent,
    CampaignSalesBenDeletePopupComponent,
    CampaignSalesBenDeleteDialogComponent,
    campaignRoute,
    campaignPopupRoute
} from './';

const ENTITY_STATES = [...campaignRoute, ...campaignPopupRoute];

@NgModule({
    imports: [SalesBenefitSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CampaignSalesBenComponent,
        CampaignSalesBenDetailComponent,
        CampaignSalesBenUpdateComponent,
        CampaignSalesBenDeleteDialogComponent,
        CampaignSalesBenDeletePopupComponent
    ],
    entryComponents: [
        CampaignSalesBenComponent,
        CampaignSalesBenUpdateComponent,
        CampaignSalesBenDeleteDialogComponent,
        CampaignSalesBenDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalesBenefitCampaignSalesBenModule {}
