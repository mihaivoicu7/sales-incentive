import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICampaignSalesBen } from 'app/shared/model/campaign-sales-ben.model';

@Component({
    selector: 'jhi-campaign-detail',
    templateUrl: './campaign-detail.component.html'
})
export class CampaignDetailComponent implements OnInit {
    campaign: ICampaignSalesBen;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ campaign }) => {
            this.campaign = campaign;
        });
    }

    previousState() {
        window.history.back();
    }
}
