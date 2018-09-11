import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISellerWalletSalesBen } from 'app/shared/model/seller-wallet-sales-ben.model';
import { Principal } from 'app/core';
import { SellerWalletSalesBenService } from './seller-wallet-sales-ben.service';

@Component({
    selector: 'jhi-seller-wallet-sales-ben',
    templateUrl: './seller-wallet-sales-ben.component.html'
})
export class SellerWalletSalesBenComponent implements OnInit, OnDestroy {
    sellerWallets: ISellerWalletSalesBen[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sellerWalletService: SellerWalletSalesBenService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.sellerWalletService.query().subscribe(
            (res: HttpResponse<ISellerWalletSalesBen[]>) => {
                this.sellerWallets = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSellerWallets();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISellerWalletSalesBen) {
        return item.id;
    }

    registerChangeInSellerWallets() {
        this.eventSubscriber = this.eventManager.subscribe('sellerWalletListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
