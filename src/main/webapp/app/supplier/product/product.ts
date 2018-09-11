import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductSalesBen } from 'app/shared/model/product-sales-ben.model';
import { SellerProductService } from './seller-product.service';
import { ProductSalesBenComponent } from './product-sales-ben.component';
import { ProductSalesBenDetailComponent } from './product-sales-ben-detail.component';
import { ProductSalesBenUpdateComponent } from './product-sales-ben-update.component';
import { ProductSalesBenDeletePopupComponent } from './product-sales-ben-delete-dialog.component';
import { IProductSalesBen } from 'app/shared/model/product-sales-ben.model';

@Injectable({ providedIn: 'root' })
export class ProductSalesBenResolve implements Resolve<IProductSalesBen> {
    constructor(private service: SellerProductService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((product: HttpResponse<ProductSalesBen>) => product.body));
        }
        return of(new ProductSalesBen());
    }
}

export const productRoute: Routes = [
    {
        path: 'product-sales-ben',
        component: ProductSalesBenComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Products'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'product-sales-ben/:id/view',
        component: ProductSalesBenDetailComponent,
        resolve: {
            product: ProductSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Products'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'product-sales-ben/new',
        component: ProductSalesBenUpdateComponent,
        resolve: {
            product: ProductSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Products'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'product-sales-ben/:id/edit',
        component: ProductSalesBenUpdateComponent,
        resolve: {
            product: ProductSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Products'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productPopupRoute: Routes = [
    {
        path: 'product-sales-ben/:id/delete',
        component: ProductSalesBenDeletePopupComponent,
        resolve: {
            product: ProductSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Products'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
