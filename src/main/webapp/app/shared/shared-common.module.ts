import { NgModule } from '@angular/core';

import { SalesBenefitSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [SalesBenefitSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [SalesBenefitSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class SalesBenefitSharedCommonModule {}
