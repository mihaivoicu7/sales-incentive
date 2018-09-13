import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiResolvePagingParams} from 'ng-jhipster';
import {UserRouteAccessService} from 'app/core';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';
import {CampaignSalesBen, ICampaignSalesBen} from 'app/shared/model/campaign-sales-ben.model';
import {CampaignService} from '../service/campaign.service';
import {SupplierCampaignProductComponent} from './supplier-campaign-product.component';

@Injectable({ providedIn: 'root' })
export class CampaignSalesBenResolve implements Resolve<ICampaignSalesBen> {
    constructor(private service: CampaignService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((campaign: HttpResponse<CampaignSalesBen>) => campaign.body));
        }
        return of(new CampaignSalesBen());
    }
}

export const supplierCampaignProductRoute: Routes = [
    {
        path: 'campaign-product',
        component: SupplierCampaignProductComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_SUPPLIER'],
            defaultSort: 'id,asc',
            pageTitle: 'Campaigns'
        },
        canActivate: [UserRouteAccessService]
    }
];
