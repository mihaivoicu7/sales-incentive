import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SalesBenefitSharedModule } from 'app/shared';
import {
    CampaignProductSalesBenComponent,
    CampaignProductSalesBenDetailComponent,
    CampaignProductSalesBenUpdateComponent,
    CampaignProductSalesBenDeletePopupComponent,
    CampaignProductSalesBenDeleteDialogComponent,
    campaignProductRoute,
    campaignProductPopupRoute
} from './';

const ENTITY_STATES = [...campaignProductRoute, ...campaignProductPopupRoute];

@NgModule({
    imports: [SalesBenefitSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CampaignProductSalesBenComponent,
        CampaignProductSalesBenDetailComponent,
        CampaignProductSalesBenUpdateComponent,
        CampaignProductSalesBenDeleteDialogComponent,
        CampaignProductSalesBenDeletePopupComponent
    ],
    entryComponents: [
        CampaignProductSalesBenComponent,
        CampaignProductSalesBenUpdateComponent,
        CampaignProductSalesBenDeleteDialogComponent,
        CampaignProductSalesBenDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalesBenefitCampaignProductSalesBenModule {}
