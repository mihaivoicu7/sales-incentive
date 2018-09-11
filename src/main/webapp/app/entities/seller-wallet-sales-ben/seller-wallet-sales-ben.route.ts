import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SellerWalletSalesBen } from 'app/shared/model/seller-wallet-sales-ben.model';
import { SellerWalletSalesBenService } from './seller-wallet-sales-ben.service';
import { SellerWalletSalesBenComponent } from './seller-wallet-sales-ben.component';
import { SellerWalletSalesBenDetailComponent } from './seller-wallet-sales-ben-detail.component';
import { SellerWalletSalesBenUpdateComponent } from './seller-wallet-sales-ben-update.component';
import { SellerWalletSalesBenDeletePopupComponent } from './seller-wallet-sales-ben-delete-dialog.component';
import { ISellerWalletSalesBen } from 'app/shared/model/seller-wallet-sales-ben.model';

@Injectable({ providedIn: 'root' })
export class SellerWalletSalesBenResolve implements Resolve<ISellerWalletSalesBen> {
    constructor(private service: SellerWalletSalesBenService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((sellerWallet: HttpResponse<SellerWalletSalesBen>) => sellerWallet.body));
        }
        return of(new SellerWalletSalesBen());
    }
}

export const sellerWalletRoute: Routes = [
    {
        path: 'seller-wallet-sales-ben',
        component: SellerWalletSalesBenComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SellerWallets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'seller-wallet-sales-ben/:id/view',
        component: SellerWalletSalesBenDetailComponent,
        resolve: {
            sellerWallet: SellerWalletSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SellerWallets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'seller-wallet-sales-ben/new',
        component: SellerWalletSalesBenUpdateComponent,
        resolve: {
            sellerWallet: SellerWalletSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SellerWallets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'seller-wallet-sales-ben/:id/edit',
        component: SellerWalletSalesBenUpdateComponent,
        resolve: {
            sellerWallet: SellerWalletSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SellerWallets'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sellerWalletPopupRoute: Routes = [
    {
        path: 'seller-wallet-sales-ben/:id/delete',
        component: SellerWalletSalesBenDeletePopupComponent,
        resolve: {
            sellerWallet: SellerWalletSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SellerWallets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
