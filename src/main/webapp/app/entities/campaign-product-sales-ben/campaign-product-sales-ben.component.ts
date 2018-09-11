import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICampaignProductSalesBen } from 'app/shared/model/campaign-product-sales-ben.model';
import { Principal } from 'app/core';
import { CampaignProductSalesBenService } from './campaign-product-sales-ben.service';

@Component({
    selector: 'jhi-campaign-product-sales-ben',
    templateUrl: './campaign-product-sales-ben.component.html'
})
export class CampaignProductSalesBenComponent implements OnInit, OnDestroy {
    campaignProducts: ICampaignProductSalesBen[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private campaignProductService: CampaignProductSalesBenService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.campaignProductService.query().subscribe(
            (res: HttpResponse<ICampaignProductSalesBen[]>) => {
                this.campaignProducts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCampaignProducts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICampaignProductSalesBen) {
        return item.id;
    }

    registerChangeInCampaignProducts() {
        this.eventSubscriber = this.eventManager.subscribe('campaignProductListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
