import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISellerSalesBen } from 'app/shared/model/seller-sales-ben.model';
import { Principal } from 'app/core';
import { SellerSalesBenService } from './seller-sales-ben.service';

@Component({
    selector: 'jhi-seller-sales-ben',
    templateUrl: './seller-sales-ben.component.html'
})
export class SellerSalesBenComponent implements OnInit, OnDestroy {
    sellers: ISellerSalesBen[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sellerService: SellerSalesBenService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.sellerService.query().subscribe(
            (res: HttpResponse<ISellerSalesBen[]>) => {
                this.sellers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSellers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISellerSalesBen) {
        return item.id;
    }

    registerChangeInSellers() {
        this.eventSubscriber = this.eventManager.subscribe('sellerListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
