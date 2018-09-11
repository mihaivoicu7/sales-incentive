import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ICampaignSalesBen } from 'app/shared/model/campaign-sales-ben.model';
import { CampaignSalesBenService } from './campaign-sales-ben.service';
import { ISupplierSalesBen } from 'app/shared/model/supplier-sales-ben.model';
import { SupplierSalesBenService } from 'app/entities/supplier-sales-ben';

@Component({
    selector: 'jhi-campaign-sales-ben-update',
    templateUrl: './campaign-sales-ben-update.component.html'
})
export class CampaignSalesBenUpdateComponent implements OnInit {
    private _campaign: ICampaignSalesBen;
    isSaving: boolean;

    suppliers: ISupplierSalesBen[];
    fromDate: string;
    toDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private campaignService: CampaignSalesBenService,
        private supplierService: SupplierSalesBenService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ campaign }) => {
            this.campaign = campaign;
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
        this.campaign.fromDate = moment(this.fromDate, DATE_TIME_FORMAT);
        this.campaign.toDate = moment(this.toDate, DATE_TIME_FORMAT);
        if (this.campaign.id !== undefined) {
            this.subscribeToSaveResponse(this.campaignService.update(this.campaign));
        } else {
            this.subscribeToSaveResponse(this.campaignService.create(this.campaign));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICampaignSalesBen>>) {
        result.subscribe((res: HttpResponse<ICampaignSalesBen>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get campaign() {
        return this._campaign;
    }

    set campaign(campaign: ICampaignSalesBen) {
        this._campaign = campaign;
        this.fromDate = moment(campaign.fromDate).format(DATE_TIME_FORMAT);
        this.toDate = moment(campaign.toDate).format(DATE_TIME_FORMAT);
    }
}
