import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import {DATE_FORMAT, DATE_TIME_FORMAT} from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { Router } from "@angular/router";

import { ICampaignSalesBen } from 'app/shared/model/campaign-sales-ben.model';
import { CampaignService } from '../service/campaign.service';
import { ISupplierSalesBen } from 'app/shared/model/supplier-sales-ben.model';
import { SupplierSalesBenService } from 'app/entities/supplier-sales-ben';
import {PreviousState} from "app/common/previous-state";

@Component({
    selector: 'jhi-campaign-update',
    templateUrl: './supplier-campaign-update.component.html'
})
export class SupplierCampaignUpdateComponent extends PreviousState implements OnInit {
    private _campaign: ICampaignSalesBen;
    isSaving: boolean;

    suppliers: ISupplierSalesBen[];
    fromDate: string;
    toDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private campaignService: CampaignService,
        private supplierService: SupplierSalesBenService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        super();
    }

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

    deleteCampaign() {
        if(this.campaign.id) {
            this.campaignService.delete(this.campaign.id).subscribe(() => {
                this.router.navigate(['/campaign']);
            });
        } else {
            this.router.navigate(['/campaign']);
        }
    }

    addProducts() {
        this.campaignService.create(this.campaign).subscribe(campaign => {
            this.router.navigate(['/campaign-product']);
        });
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

    get campaign() {
        return this._campaign;
    }

    set campaign(campaign: ICampaignSalesBen) {
        this._campaign = campaign;
        if(campaign.id) {
            this.fromDate = moment(campaign.fromDate).format(DATE_FORMAT);
            this.toDate = moment(campaign.toDate).format(DATE_FORMAT);
        } else {
            const currentDate = new Date();
            this.fromDate = moment(currentDate).format(DATE_FORMAT);
            this.toDate = moment(currentDate).format(DATE_FORMAT);
        }
    }
}
