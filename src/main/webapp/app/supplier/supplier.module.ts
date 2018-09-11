import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {SupplierProductModule} from './product/supplier-product.module';
import {SupplierProductService} from './service/supplier-product.service';
@NgModule({
    // prettier-ignore
    imports: [
        SupplierProductModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [SupplierProductService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SupplierModule {}
