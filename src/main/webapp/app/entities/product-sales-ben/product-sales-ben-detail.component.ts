import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductSalesBen } from 'app/shared/model/product-sales-ben.model';

@Component({
    selector: 'jhi-product-sales-ben-detail',
    templateUrl: './product-sales-ben-detail.component.html'
})
export class ProductSalesBenDetailComponent implements OnInit {
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
