import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IProductSalesBen } from 'app/shared/model/product-sales-ben.model';
import { SupplierProductService } from '../service/supplier-product.service';
import { ISupplierSalesBen } from 'app/shared/model/supplier-sales-ben.model';
import { SupplierSalesBenService } from 'app/entities/supplier-sales-ben';

@Component({
    selector: 'jhi-supplier-product-update',
    templateUrl: './supplier-product-update.component.html'
})
export class SupplierProductUpdateComponent implements OnInit {
    private _product: IProductSalesBen;
    isSaving: boolean;

    suppliers: ISupplierSalesBen[];
    createDate: string;
    updateDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private productService: SupplierProductService,
        private supplierService: SupplierSalesBenService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ product }) => {
            this.product = product;
        });
        this.supplierService.query().subscribe(
            (res: HttpResponse<ISupplierSalesBen[]>) => {
                this.suppliers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.product.createDate = moment(this.createDate, DATE_TIME_FORMAT);
        this.product.updateDate = moment(this.updateDate, DATE_TIME_FORMAT);
        if (this.product.id !== undefined) {
            this.subscribeToSaveResponse(this.productService.update(this.product));
        } else {
            this.subscribeToSaveResponse(this.productService.create(this.product));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IProductSalesBen>>) {
        result.subscribe((res: HttpResponse<IProductSalesBen>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSupplierById(index: number, item: ISupplierSalesBen) {
        return item.id;
    }
    get product() {
        return this._product;
    }

    set product(product: IProductSalesBen) {
        this._product = product;
        this.createDate = moment(product.createDate).format(DATE_TIME_FORMAT);
        this.updateDate = moment(product.updateDate).format(DATE_TIME_FORMAT);
    }
}
