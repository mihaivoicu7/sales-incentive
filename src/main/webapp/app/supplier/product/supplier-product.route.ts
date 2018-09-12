import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiResolvePagingParams} from 'ng-jhipster';
import {UserRouteAccessService} from 'app/core';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';
import {IProductSalesBen, ProductSalesBen} from 'app/shared/model/product-sales-ben.model';
import {SupplierProductService} from '../service/supplier-product.service';
import {SupplierProductComponent} from './supplier-product.component';
import {SupplierProductUpdateComponent} from './supplier-product-update.component';
import {SupplierProductDeleteDialogComponent, SupplierProductDeletePopupComponent} from 'app/supplier/product/supplier-product-delete-dialog.component';
import {SupplierProductDetailComponent} from 'app/supplier/product/supplier-product-detail.component';

@Injectable({ providedIn: 'root' })
export class SupplierProductResolve implements Resolve<IProductSalesBen> {
    constructor(private service: SupplierProductService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((product: HttpResponse<ProductSalesBen>) => product.body));
        }
        return of(new ProductSalesBen());
    }
}

export const supplierProductRoute: Routes = [
    {
        path: 'supplier-product',
        component: SupplierProductComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_SUPPLIER'],
            defaultSort: 'id,asc',
            pageTitle: 'Produse'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'supplier-product/new',
        component: SupplierProductUpdateComponent,
        resolve: {
            product: SupplierProductResolve
        },
        data: {
            authorities: ['ROLE_SUPPLIER'],
            pageTitle: 'Products'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'supplier-product/:id/view',
        component: SupplierProductDetailComponent,
        resolve: {
            product: SupplierProductResolve
        },
        data: {
            authorities: ['ROLE_SUPPLIER'],
            pageTitle: 'Products'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'supplier-product/:id/edit',
        component: SupplierProductUpdateComponent,
        resolve: {
            product: SupplierProductResolve
        },
        data: {
            authorities: ['ROLE_SUPPLIER'],
            pageTitle: 'Products'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productPopupRoute: Routes = [
    {
        path: 'supplier-product/:id/delete',
        component: SupplierProductDeletePopupComponent,
        resolve: {
            product: SupplierProductResolve
        },
        data: {
            authorities: ['ROLE_SUPPLIER'],
            pageTitle: 'Products'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
