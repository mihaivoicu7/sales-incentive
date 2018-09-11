import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductSalesBen } from 'app/shared/model/product-sales-ben.model';
import { SupplierProductService } from '../service/supplier-product.service';
import { SupplierProductComponent } from './supplier-product.component';
import { SupplierProductUpdateComponent } from './supplier-product-update.component';
import { IProductSalesBen } from 'app/shared/model/product-sales-ben.model';

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
    }
];
