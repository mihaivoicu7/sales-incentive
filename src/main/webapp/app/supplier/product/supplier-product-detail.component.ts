import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductSalesBen } from 'app/shared/model/product-sales-ben.model';

@Component({
    selector: 'jhi-supplier-product',
    templateUrl: './supplier-product-detail.component.html'
})
export class SupplierProductDetailComponent implements OnInit {
    product: IProductSalesBen;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ product }) => {
            this.product = product;
        });
    }

    previousState() {
        window.history.back();
    }
}
