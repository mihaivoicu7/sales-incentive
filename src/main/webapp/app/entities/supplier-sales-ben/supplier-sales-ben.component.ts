import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISupplierSalesBen } from 'app/shared/model/supplier-sales-ben.model';
import { Principal } from 'app/core';
import { SupplierSalesBenService } from './supplier-sales-ben.service';

@Component({
    selector: 'jhi-supplier-sales-ben',
    templateUrl: './supplier-sales-ben.component.html'
})
export class SupplierSalesBenComponent implements OnInit, OnDestroy {
    suppliers: ISupplierSalesBen[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private supplierService: SupplierSalesBenService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.supplierService.query().subscribe(
            (res: HttpResponse<ISupplierSalesBen[]>) => {
                this.suppliers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSuppliers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISupplierSalesBen) {
        return item.id;
    }

    registerChangeInSuppliers() {
        this.eventSubscriber = this.eventManager.subscribe('supplierListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
