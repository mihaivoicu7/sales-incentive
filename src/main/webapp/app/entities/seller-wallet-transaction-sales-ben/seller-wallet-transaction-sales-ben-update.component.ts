import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ISellerWalletTransactionSalesBen } from 'app/shared/model/seller-wallet-transaction-sales-ben.model';
import { SellerWalletTransactionSalesBenService } from './seller-wallet-transaction-sales-ben.service';
import { ISellerWalletSalesBen } from 'app/shared/model/seller-wallet-sales-ben.model';
import { SellerWalletSalesBenService } from 'app/entities/seller-wallet-sales-ben';

@Component({
    selector: 'jhi-seller-wallet-transaction-sales-ben-update',
    templateUrl: './seller-wallet-transaction-sales-ben-update.component.html'
})
export class SellerWalletTransactionSalesBenUpdateComponent implements OnInit {
    private _sellerWalletTransaction: ISellerWalletTransactionSalesBen;
    isSaving: boolean;

    sellerwallets: ISellerWalletSalesBen[];
    transactionDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private sellerWalletTransactionService: SellerWalletTransactionSalesBenService,
        private sellerWalletService: SellerWalletSalesBenService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ sellerWalletTransaction }) => {
            this.sellerWalletTransaction = sellerWalletTransaction;
        });
        this.sellerWalletService.query().subscribe(
            (res: HttpResponse<ISellerWalletSalesBen[]>) => {
                this.sellerwallets = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.sellerWalletTransaction.transactionDate = moment(this.transactionDate, DATE_TIME_FORMAT);
        if (this.sellerWalletTransaction.id !== undefined) {
            this.subscribeToSaveResponse(this.sellerWalletTransactionService.update(this.sellerWalletTransaction));
        } else {
            this.subscribeToSaveResponse(this.sellerWalletTransactionService.create(this.sellerWalletTransaction));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISellerWalletTransactionSalesBen>>) {
        result.subscribe(
            (res: HttpResponse<ISellerWalletTransactionSalesBen>) => this.onSaveSuccess(),
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

    trackSellerWalletById(index: number, item: ISellerWalletSalesBen) {
        return item.id;
    }
    get sellerWalletTransaction() {
        return this._sellerWalletTransaction;
    }

    set sellerWalletTransaction(sellerWalletTransaction: ISellerWalletTransactionSalesBen) {
        this._sellerWalletTransaction = sellerWalletTransaction;
        this.transactionDate = moment(sellerWalletTransaction.transactionDate).format(DATE_TIME_FORMAT);
    }
}
