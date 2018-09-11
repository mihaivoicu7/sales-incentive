import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CampaignSalesBen } from 'app/shared/model/campaign-sales-ben.model';
import { CampaignService } from '../service/campaign.service';
import { CampaignComponent } from './campaign.component';
import { CampaignDetailComponent } from './campaign-detail.component';
import { CampaignUpdateComponent } from './campaign-update.component';
import { CampaignSalesBenDeletePopupComponent } from './campaign-delete-dialog.component';
import { ICampaignSalesBen } from 'app/shared/model/campaign-sales-ben.model';

@Injectable({ providedIn: 'root' })
export class CampaignSalesBenResolve implements Resolve<ICampaignSalesBen> {
    constructor(private service: CampaignService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((campaign: HttpResponse<CampaignSalesBen>) => campaign.body));
        }
        return of(new CampaignSalesBen());
    }
}

export const campaignRoute: Routes = [
    {
        path: 'campaign',
        component: CampaignComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_SUPPLIER'],
            defaultSort: 'id,asc',
            pageTitle: 'Campaigns'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'campaign/:id/view',
        component: CampaignDetailComponent,
        resolve: {
            campaign: CampaignSalesBenResolve
        },
        data: {
            authorities: ['ROLE_SUPPLIER'],
            pageTitle: 'Campaigns'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'campaign/new',
        component: CampaignUpdateComponent,
        resolve: {
            campaign: CampaignSalesBenResolve
        },
        data: {
            authorities: ['ROLE_SUPPLIER'],
            pageTitle: 'Campaigns'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'campaign/:id/edit',
        component: CampaignUpdateComponent,
        resolve: {
            campaign: CampaignSalesBenResolve
        },
        data: {
            authorities: ['ROLE_SUPPLIER'],
            pageTitle: 'Campaigns'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const campaignPopupRoute: Routes = [
    {
        path: 'campaign/:id/delete',
        component: CampaignSalesBenDeletePopupComponent,
        resolve: {
            campaign: CampaignSalesBenResolve
        },
        data: {
            authorities: ['ROLE_SUPPLIER'],
            pageTitle: 'Campaigns'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
