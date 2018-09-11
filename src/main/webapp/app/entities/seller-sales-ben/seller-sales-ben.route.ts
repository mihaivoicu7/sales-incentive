import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SellerSalesBen } from 'app/shared/model/seller-sales-ben.model';
import { SellerSalesBenService } from './seller-sales-ben.service';
import { SellerSalesBenComponent } from './seller-sales-ben.component';
import { SellerSalesBenDetailComponent } from './seller-sales-ben-detail.component';
import { SellerSalesBenUpdateComponent } from './seller-sales-ben-update.component';
import { SellerSalesBenDeletePopupComponent } from './seller-sales-ben-delete-dialog.component';
import { ISellerSalesBen } from 'app/shared/model/seller-sales-ben.model';

@Injectable({ providedIn: 'root' })
export class SellerSalesBenResolve implements Resolve<ISellerSalesBen> {
    constructor(private service: SellerSalesBenService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((seller: HttpResponse<SellerSalesBen>) => seller.body));
        }
        return of(new SellerSalesBen());
    }
}

export const sellerRoute: Routes = [
    {
        path: 'seller-sales-ben',
        component: SellerSalesBenComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sellers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'seller-sales-ben/:id/view',
        component: SellerSalesBenDetailComponent,
        resolve: {
            seller: SellerSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sellers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'seller-sales-ben/new',
        component: SellerSalesBenUpdateComponent,
        resolve: {
            seller: SellerSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sellers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'seller-sales-ben/:id/edit',
        component: SellerSalesBenUpdateComponent,
        resolve: {
            seller: SellerSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sellers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sellerPopupRoute: Routes = [
    {
        path: 'seller-sales-ben/:id/delete',
        component: SellerSalesBenDeletePopupComponent,
        resolve: {
            seller: SellerSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sellers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
