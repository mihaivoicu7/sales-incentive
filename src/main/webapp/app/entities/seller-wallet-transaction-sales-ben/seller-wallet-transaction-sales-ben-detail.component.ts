import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISellerWalletTransactionSalesBen } from 'app/shared/model/seller-wallet-transaction-sales-ben.model';

@Component({
    selector: 'jhi-seller-wallet-transaction-sales-ben-detail',
    templateUrl: './seller-wallet-transaction-sales-ben-detail.component.html'
})
export class SellerWalletTransactionSalesBenDetailComponent implements OnInit {
    sellerWalletTransaction: ISellerWalletTransactionSalesBen;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sellerWalletTransaction }) => {
            this.sellerWalletTransaction = sellerWalletTransaction;
        });
    }

    previousState() {
        window.history.back();
    }
}
