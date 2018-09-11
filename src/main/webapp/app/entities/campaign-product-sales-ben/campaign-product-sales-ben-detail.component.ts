import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICampaignProductSalesBen } from 'app/shared/model/campaign-product-sales-ben.model';

@Component({
    selector: 'jhi-campaign-product-sales-ben-detail',
    templateUrl: './campaign-product-sales-ben-detail.component.html'
})
export class CampaignProductSalesBenDetailComponent implements OnInit {
    campaignProduct: ICampaignProductSalesBen;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ campaignProduct }) => {
            this.campaignProduct = campaignProduct;
        });
    }

    previousState() {
        window.history.back();
    }
}
