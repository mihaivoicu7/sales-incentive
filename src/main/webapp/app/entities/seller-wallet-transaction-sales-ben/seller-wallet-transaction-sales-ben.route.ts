import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SellerWalletTransactionSalesBen } from 'app/shared/model/seller-wallet-transaction-sales-ben.model';
import { SellerWalletTransactionSalesBenService } from './seller-wallet-transaction-sales-ben.service';
import { SellerWalletTransactionSalesBenComponent } from './seller-wallet-transaction-sales-ben.component';
import { SellerWalletTransactionSalesBenDetailComponent } from './seller-wallet-transaction-sales-ben-detail.component';
import { SellerWalletTransactionSalesBenUpdateComponent } from './seller-wallet-transaction-sales-ben-update.component';
import { SellerWalletTransactionSalesBenDeletePopupComponent } from './seller-wallet-transaction-sales-ben-delete-dialog.component';
import { ISellerWalletTransactionSalesBen } from 'app/shared/model/seller-wallet-transaction-sales-ben.model';

@Injectable({ providedIn: 'root' })
export class SellerWalletTransactionSalesBenResolve implements Resolve<ISellerWalletTransactionSalesBen> {
    constructor(private service: SellerWalletTransactionSalesBenService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((sellerWalletTransaction: HttpResponse<SellerWalletTransactionSalesBen>) => sellerWalletTransaction.body));
        }
        return of(new SellerWalletTransactionSalesBen());
    }
}

export const sellerWalletTransactionRoute: Routes = [
    {
        path: 'seller-wallet-transaction-sales-ben',
        component: SellerWalletTransactionSalesBenComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'SellerWalletTransactions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'seller-wallet-transaction-sales-ben/:id/view',
        component: SellerWalletTransactionSalesBenDetailComponent,
        resolve: {
            sellerWalletTransaction: SellerWalletTransactionSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SellerWalletTransactions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'seller-wallet-transaction-sales-ben/new',
        component: SellerWalletTransactionSalesBenUpdateComponent,
        resolve: {
            sellerWalletTransaction: SellerWalletTransactionSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SellerWalletTransactions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'seller-wallet-transaction-sales-ben/:id/edit',
        component: SellerWalletTransactionSalesBenUpdateComponent,
        resolve: {
            sellerWalletTransaction: SellerWalletTransactionSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SellerWalletTransactions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sellerWalletTransactionPopupRoute: Routes = [
    {
        path: 'seller-wallet-transaction-sales-ben/:id/delete',
        component: SellerWalletTransactionSalesBenDeletePopupComponent,
        resolve: {
            sellerWalletTransaction: SellerWalletTransactionSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SellerWalletTransactions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
