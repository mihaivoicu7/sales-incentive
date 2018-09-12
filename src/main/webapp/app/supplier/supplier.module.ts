import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {SupplierProductModule} from './product/supplier-product.module';
import {SupplierProductService} from './service/supplier-product.service';
import {SalesBenefitCampaignModule} from './campaign/supplier-campaign.module';
import {CampaignService} from './service/campaign.service';

@NgModule({
    // prettier-ignore
    imports: [
        SupplierProductModule,
        SalesBenefitCampaignModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [SupplierProductService, CampaignService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SupplierModule {

}
