import { NgModule } from '@angular/core';

import { SalesBenefitSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';
import {DateBiggerThanValidator } from './validator/datebigger.directive';

@NgModule({
    imports: [SalesBenefitSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent, DateBiggerThanValidator],
    exports: [SalesBenefitSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent, DateBiggerThanValidator]
})
export class SalesBenefitSharedCommonModule {}
