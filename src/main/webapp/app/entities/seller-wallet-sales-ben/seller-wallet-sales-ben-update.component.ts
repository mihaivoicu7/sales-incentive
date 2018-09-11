import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISellerWalletSalesBen } from 'app/shared/model/seller-wallet-sales-ben.model';
import { SellerWalletSalesBenService } from './seller-wallet-sales-ben.service';
import { ISellerSalesBen } from 'app/shared/model/seller-sales-ben.model';
import { SellerSalesBenService } from 'app/entities/seller-sales-ben';

@Component({
    selector: 'jhi-seller-wallet-sales-ben-update',
    templateUrl: './seller-wallet-sales-ben-update.component.html'
})
export class SellerWalletSalesBenUpdateComponent implements OnInit {
    private _sellerWallet: ISellerWalletSalesBen;
    isSaving: boolean;

    sellers: ISellerSalesBen[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private sellerWalletService: SellerWalletSalesBenService,
        private sellerService: SellerSalesBenService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ sellerWallet }) => {
            this.sellerWallet = sellerWallet;
        });
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
        if (this.sellerWallet.id !== undefined) {
            this.subscribeToSaveResponse(this.sellerWalletService.update(this.sellerWallet));
        } else {
            this.subscribeToSaveResponse(this.sellerWalletService.create(this.sellerWallet));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISellerWalletSalesBen>>) {
        result.subscribe(
            (res: HttpResponse<ISellerWalletSalesBen>) => this.onSaveSuccess(),
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

    trackSellerById(index: number, item: ISellerSalesBen) {
        return item.id;
    }
    get sellerWallet() {
        return this._sellerWallet;
    }

    set sellerWallet(sellerWallet: ISellerWalletSalesBen) {
        this._sellerWallet = sellerWallet;
    }
}
