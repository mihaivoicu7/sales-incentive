import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISellerTransactionSalesBen } from 'app/shared/model/seller-transaction-sales-ben.model';

@Component({
    selector: 'jhi-seller-transaction-sales-ben-detail',
    templateUrl: './seller-transaction-sales-ben-detail.component.html'
})
export class SellerTransactionSalesBenDetailComponent implements OnInit {
    sellerTransaction: ISellerTransactionSalesBen;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sellerTransaction }) => {
            this.sellerTransaction = sellerTransaction;
        });
    }

    previousState() {
        window.history.back();
    }
}
