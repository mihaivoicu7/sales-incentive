import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SellerTransactionSalesBen } from 'app/shared/model/seller-transaction-sales-ben.model';
import { SellerTransactionSalesBenService } from './seller-transaction-sales-ben.service';
import { SellerTransactionSalesBenComponent } from './seller-transaction-sales-ben.component';
import { SellerTransactionSalesBenDetailComponent } from './seller-transaction-sales-ben-detail.component';
import { SellerTransactionSalesBenUpdateComponent } from './seller-transaction-sales-ben-update.component';
import { SellerTransactionSalesBenDeletePopupComponent } from './seller-transaction-sales-ben-delete-dialog.component';
import { ISellerTransactionSalesBen } from 'app/shared/model/seller-transaction-sales-ben.model';

@Injectable({ providedIn: 'root' })
export class SellerTransactionSalesBenResolve implements Resolve<ISellerTransactionSalesBen> {
    constructor(private service: SellerTransactionSalesBenService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((sellerTransaction: HttpResponse<SellerTransactionSalesBen>) => sellerTransaction.body));
        }
        return of(new SellerTransactionSalesBen());
    }
}

export const sellerTransactionRoute: Routes = [
    {
        path: 'seller-transaction-sales-ben',
        component: SellerTransactionSalesBenComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'SellerTransactions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'seller-transaction-sales-ben/:id/view',
        component: SellerTransactionSalesBenDetailComponent,
        resolve: {
            sellerTransaction: SellerTransactionSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SellerTransactions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'seller-transaction-sales-ben/new',
        component: SellerTransactionSalesBenUpdateComponent,
        resolve: {
            sellerTransaction: SellerTransactionSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SellerTransactions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'seller-transaction-sales-ben/:id/edit',
        component: SellerTransactionSalesBenUpdateComponent,
        resolve: {
            sellerTransaction: SellerTransactionSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SellerTransactions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sellerTransactionPopupRoute: Routes = [
    {
        path: 'seller-transaction-sales-ben/:id/delete',
        component: SellerTransactionSalesBenDeletePopupComponent,
        resolve: {
            sellerTransaction: SellerTransactionSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SellerTransactions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
