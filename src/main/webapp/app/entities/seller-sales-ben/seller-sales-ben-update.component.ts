import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISellerSalesBen } from 'app/shared/model/seller-sales-ben.model';
import { SellerSalesBenService } from './seller-sales-ben.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-seller-sales-ben-update',
    templateUrl: './seller-sales-ben-update.component.html'
})
export class SellerSalesBenUpdateComponent implements OnInit {
    private _seller: ISellerSalesBen;
    isSaving: boolean;

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private sellerService: SellerSalesBenService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ seller }) => {
            this.seller = seller;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.seller.id !== undefined) {
            this.subscribeToSaveResponse(this.sellerService.update(this.seller));
        } else {
            this.subscribeToSaveResponse(this.sellerService.create(this.seller));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISellerSalesBen>>) {
        result.subscribe((res: HttpResponse<ISellerSalesBen>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
    get seller() {
        return this._seller;
    }

    set seller(seller: ISellerSalesBen) {
        this._seller = seller;
    }
}
