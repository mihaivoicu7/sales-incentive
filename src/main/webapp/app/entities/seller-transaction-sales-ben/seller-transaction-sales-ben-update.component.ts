import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ISellerTransactionSalesBen } from 'app/shared/model/seller-transaction-sales-ben.model';
import { SellerTransactionSalesBenService } from './seller-transaction-sales-ben.service';
import { ICampaignProductSalesBen } from 'app/shared/model/campaign-product-sales-ben.model';
import { CampaignProductSalesBenService } from 'app/entities/campaign-product-sales-ben';
import { ISellerSalesBen } from 'app/shared/model/seller-sales-ben.model';
import { SellerSalesBenService } from 'app/entities/seller-sales-ben';

@Component({
    selector: 'jhi-seller-transaction-sales-ben-update',
    templateUrl: './seller-transaction-sales-ben-update.component.html'
})
export class SellerTransactionSalesBenUpdateComponent implements OnInit {
    private _sellerTransaction: ISellerTransactionSalesBen;
    isSaving: boolean;

    campaignproducts: ICampaignProductSalesBen[];

    sellers: ISellerSalesBen[];
    transactionDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private sellerTransactionService: SellerTransactionSalesBenService,
        private campaignProductService: CampaignProductSalesBenService,
        private sellerService: SellerSalesBenService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ sellerTransaction }) => {
            this.sellerTransaction = sellerTransaction;
        });
        this.campaignProductService.query().subscribe(
            (res: HttpResponse<ICampaignProductSalesBen[]>) => {
                this.campaignproducts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.sellerService.query().subscribe(
            (res: HttpResponse<ISellerSalesBen[]>) => {
                this.sellers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.sellerTransaction.transactionDate = moment(this.transactionDate, DATE_TIME_FORMAT);
        if (this.sellerTransaction.id !== undefined) {
            this.subscribeToSaveResponse(this.sellerTransactionService.update(this.sellerTransaction));
        } else {
            this.subscribeToSaveResponse(this.sellerTransactionService.create(this.sellerTransaction));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISellerTransactionSalesBen>>) {
        result.subscribe(
            (res: HttpResponse<ISellerTransactionSalesBen>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCampaignProductById(index: number, item: ICampaignProductSalesBen) {
        return item.id;
    }

    trackSellerById(index: number, item: ISellerSalesBen) {
        return item.id;
    }
    get sellerTransaction() {
        return this._sellerTransaction;
    }

    set sellerTransaction(sellerTransaction: ISellerTransactionSalesBen) {
        this._sellerTransaction = sellerTransaction;
        this.transactionDate = moment(sellerTransaction.transactionDate).format(DATE_TIME_FORMAT);
    }
}
