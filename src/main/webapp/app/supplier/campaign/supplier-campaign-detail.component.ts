import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICampaignSalesBen } from 'app/shared/model/campaign-sales-ben.model';
import {PreviousState} from 'app/common/previous-state';

@Component({
    selector: 'jhi-campaign-detail',
    templateUrl: './supplier-campaign-detail.component.html'
})
export class SupplierCampaignDetailComponent extends PreviousState implements OnInit {
    campaign: ICampaignSalesBen;

    constructor(private activatedRoute: ActivatedRoute) {
        super();
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ campaign }) => {
            this.campaign = campaign;
        });
    }

}
