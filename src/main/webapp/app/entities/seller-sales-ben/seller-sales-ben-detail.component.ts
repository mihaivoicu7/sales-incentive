import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISellerSalesBen } from 'app/shared/model/seller-sales-ben.model';

@Component({
    selector: 'jhi-seller-sales-ben-detail',
    templateUrl: './seller-sales-ben-detail.component.html'
})
export class SellerSalesBenDetailComponent implements OnInit {
    seller: ISellerSalesBen;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ seller }) => {
            this.seller = seller;
        });
    }

    previousState() {
        window.history.back();
    }
}
