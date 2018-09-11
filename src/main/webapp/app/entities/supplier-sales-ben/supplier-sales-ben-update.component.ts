import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISupplierSalesBen } from 'app/shared/model/supplier-sales-ben.model';
import { SupplierSalesBenService } from './supplier-sales-ben.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-supplier-sales-ben-update',
    templateUrl: './supplier-sales-ben-update.component.html'
})
export class SupplierSalesBenUpdateComponent implements OnInit {
    private _supplier: ISupplierSalesBen;
    isSaving: boolean;

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private supplierService: SupplierSalesBenService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ supplier }) => {
            this.supplier = supplier;
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
        if (this.supplier.id !== undefined) {
            this.subscribeToSaveResponse(this.supplierService.update(this.supplier));
        } else {
            this.subscribeToSaveResponse(this.supplierService.create(this.supplier));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISupplierSalesBen>>) {
        result.subscribe((res: HttpResponse<ISupplierSalesBen>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get supplier() {
        return this._supplier;
    }

    set supplier(supplier: ISupplierSalesBen) {
        this._supplier = supplier;
    }
}
