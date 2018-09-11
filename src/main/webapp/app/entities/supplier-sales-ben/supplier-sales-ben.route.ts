import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupplierSalesBen } from 'app/shared/model/supplier-sales-ben.model';
import { SupplierSalesBenService } from './supplier-sales-ben.service';
import { SupplierSalesBenComponent } from './supplier-sales-ben.component';
import { SupplierSalesBenDetailComponent } from './supplier-sales-ben-detail.component';
import { SupplierSalesBenUpdateComponent } from './supplier-sales-ben-update.component';
import { SupplierSalesBenDeletePopupComponent } from './supplier-sales-ben-delete-dialog.component';
import { ISupplierSalesBen } from 'app/shared/model/supplier-sales-ben.model';

@Injectable({ providedIn: 'root' })
export class SupplierSalesBenResolve implements Resolve<ISupplierSalesBen> {
    constructor(private service: SupplierSalesBenService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((supplier: HttpResponse<SupplierSalesBen>) => supplier.body));
        }
        return of(new SupplierSalesBen());
    }
}

export const supplierRoute: Routes = [
    {
        path: 'supplier-sales-ben',
        component: SupplierSalesBenComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Suppliers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'supplier-sales-ben/:id/view',
        component: SupplierSalesBenDetailComponent,
        resolve: {
            supplier: SupplierSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Suppliers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'supplier-sales-ben/new',
        component: SupplierSalesBenUpdateComponent,
        resolve: {
            supplier: SupplierSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Suppliers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'supplier-sales-ben/:id/edit',
        component: SupplierSalesBenUpdateComponent,
        resolve: {
            supplier: SupplierSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Suppliers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const supplierPopupRoute: Routes = [
    {
        path: 'supplier-sales-ben/:id/delete',
        component: SupplierSalesBenDeletePopupComponent,
        resolve: {
            supplier: SupplierSalesBenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Suppliers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
