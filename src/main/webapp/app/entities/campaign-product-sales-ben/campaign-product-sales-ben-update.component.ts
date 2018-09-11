import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICampaignProductSalesBen } from 'app/shared/model/campaign-product-sales-ben.model';
import { CampaignProductSalesBenService } from './campaign-product-sales-ben.service';
import { ICampaignSalesBen } from 'app/shared/model/campaign-sales-ben.model';
import { CampaignSalesBenService } from 'app/entities/campaign-sales-ben';
import { IProductSalesBen } from 'app/shared/model/product-sales-ben.model';
import { ProductSalesBenService } from 'app/entities/product-sales-ben';

@Component({
    selector: 'jhi-campaign-product-sales-ben-update',
    templateUrl: './campaign-product-sales-ben-update.component.html'
})
export class CampaignProductSalesBenUpdateComponent implements OnInit {
    private _campaignProduct: ICampaignProductSalesBen;
    isSaving: boolean;

    campaigns: ICampaignSalesBen[];

    products: IProductSalesBen[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private campaignProductService: CampaignProductSalesBenService,
        private campaignService: CampaignSalesBenService,
        private productService: ProductSalesBenService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ campaignProduct }) => {
            this.campaignProduct = campaignProduct;
        });
        this.campaignService.query({ filter: 'campaignproduct-is-null' }).subscribe(
            (res: HttpResponse<ICampaignSalesBen[]>) => {
                if (!this.campaignProduct.campaignId) {
                    this.campaigns = res.body;
                } else {
                    this.campaignService.find(this.campaignProduct.campaignId).subscribe(
                        (subRes: HttpResponse<ICampaignSalesBen>) => {
                            this.campaigns = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.productService.query({ filter: 'campaignproduct-is-null' }).subscribe(
            (res: HttpResponse<IProductSalesBen[]>) => {
                if (!this.campaignProduct.productId) {
                    this.products = res.body;
                } else {
                    this.productService.find(this.campaignProduct.productId).subscribe(
                        (subRes: HttpResponse<IProductSalesBen>) => {
                            this.products = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.campaignProduct.id !== undefined) {
            this.subscribeToSaveResponse(this.campaignProductService.update(this.campaignProduct));
        } else {
            this.subscribeToSaveResponse(this.campaignProductService.create(this.campaignProduct));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICampaignProductSalesBen>>) {
        result.subscribe(
            (res: HttpResponse<ICampaignProductSalesBen>) => this.onSaveSuccess(),
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

    trackCampaignById(index: number, item: ICampaignSalesBen) {
        return item.id;
    }

    trackProductById(index: number, item: IProductSalesBen) {
        return item.id;
    }
    get campaignProduct() {
        return this._campaignProduct;
    }

    set campaignProduct(campaignProduct: ICampaignProductSalesBen) {
        this._campaignProduct = campaignProduct;
    }
}
