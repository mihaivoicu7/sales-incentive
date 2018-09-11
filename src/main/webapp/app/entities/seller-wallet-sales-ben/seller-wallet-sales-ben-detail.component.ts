import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISellerWalletSalesBen } from 'app/shared/model/seller-wallet-sales-ben.model';

@Component({
    selector: 'jhi-seller-wallet-sales-ben-detail',
    templateUrl: './seller-wallet-sales-ben-detail.component.html'
})
export class SellerWalletSalesBenDetailComponent implements OnInit {
    sellerWallet: ISellerWalletSalesBen;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sellerWallet }) => {
            this.sellerWallet = sellerWallet;
        });
    }

    previousState() {
        window.history.back();
    }
}
