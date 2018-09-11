import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CampaignProductSalesBen } from 'app/shared/model/campaign-product-sales-ben.model';
import { CampaignProductSalesBenService } from './campaign-product-sales-ben.service';
import { CampaignProductSalesBenComponent } from './campaign-product-sales-ben.component';
import { CampaignProductSalesBenDetailComponent } from './campaign-product-sales-ben-detail.component';
import { CampaignProductSalesBenUpdateComponent } from './campaign-product-sales-ben-update.component';
import { CampaignProductSalesBenDeletePopupComponent } from './campaign-product-sales-ben-delete-dialog.component';
import { ICampaignProductSalesBen } from 'app/shared/model/campaign-product-sales-ben.model';

@Injectable({ providedIn: 'root' })
export class CampaignProductSalesBenResolve implements Resolve<ICampaignProductSalesBen> {
    constructor(private service: CampaignProductSalesBenService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((campaignProduct: HttpResponse<CampaignProductSalesBen>) => campaignProduct.body));
        }
        return of(new CampaignProductSalesBen());
    }
}

export const campaignProductRoute: Routes = [
    {
        path: 'campaign-product-sales-ben',
        component: CampaignProductSalesBenComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CampaignProducts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'campaign-product-sales-ben/:id/view',
        component: CampaignProductSalesBenDetailComponent,
        resolve: {
            campaignProduct: CampaignProductSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CampaignProducts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'campaign-product-sales-ben/new',
        component: CampaignProductSalesBenUpdateComponent,
        resolve: {
            campaignProduct: CampaignProductSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CampaignProducts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'campaign-product-sales-ben/:id/edit',
        component: CampaignProductSalesBenUpdateComponent,
        resolve: {
            campaignProduct: CampaignProductSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CampaignProducts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const campaignProductPopupRoute: Routes = [
    {
        path: 'campaign-product-sales-ben/:id/delete',
        component: CampaignProductSalesBenDeletePopupComponent,
        resolve: {
            campaignProduct: CampaignProductSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CampaignProducts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
