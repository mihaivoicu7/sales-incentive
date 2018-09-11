import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISupplierSalesBen } from 'app/shared/model/supplier-sales-ben.model';

@Component({
    selector: 'jhi-supplier-sales-ben-detail',
    templateUrl: './supplier-sales-ben-detail.component.html'
})
export class SupplierSalesBenDetailComponent implements OnInit {
    supplier: ISupplierSalesBen;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ supplier }) => {
            this.supplier = supplier;
        });
    }

    previousState() {
        window.history.back();
    }
}
