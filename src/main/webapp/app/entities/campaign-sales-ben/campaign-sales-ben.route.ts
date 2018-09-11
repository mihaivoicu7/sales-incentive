import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CampaignSalesBen } from 'app/shared/model/campaign-sales-ben.model';
import { CampaignSalesBenService } from './campaign-sales-ben.service';
import { CampaignSalesBenComponent } from './campaign-sales-ben.component';
import { CampaignSalesBenDetailComponent } from './campaign-sales-ben-detail.component';
import { CampaignSalesBenUpdateComponent } from './campaign-sales-ben-update.component';
import { CampaignSalesBenDeletePopupComponent } from './campaign-sales-ben-delete-dialog.component';
import { ICampaignSalesBen } from 'app/shared/model/campaign-sales-ben.model';

@Injectable({ providedIn: 'root' })
export class CampaignSalesBenResolve implements Resolve<ICampaignSalesBen> {
    constructor(private service: CampaignSalesBenService) {}

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
        path: 'campaign-sales-ben',
        component: CampaignSalesBenComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Campaigns'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'campaign-sales-ben/:id/view',
        component: CampaignSalesBenDetailComponent,
        resolve: {
            campaign: CampaignSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Campaigns'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'campaign-sales-ben/new',
        component: CampaignSalesBenUpdateComponent,
        resolve: {
            campaign: CampaignSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Campaigns'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'campaign-sales-ben/:id/edit',
        component: CampaignSalesBenUpdateComponent,
        resolve: {
            campaign: CampaignSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Campaigns'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const campaignPopupRoute: Routes = [
    {
        path: 'campaign-sales-ben/:id/delete',
        component: CampaignSalesBenDeletePopupComponent,
        resolve: {
            campaign: CampaignSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Campaigns'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
