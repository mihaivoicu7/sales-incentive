import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICampaignProductSalesBen } from 'app/shared/model/campaign-product-sales-ben.model';

type EntityResponseType = HttpResponse<ICampaignProductSalesBen>;
type EntityArrayResponseType = HttpResponse<ICampaignProductSalesBen[]>;

@Injectable({ providedIn: 'root' })
export class CampaignProductSalesBenService {
    private resourceUrl = SERVER_API_URL + 'api/campaign-products';

    constructor(private http: HttpClient) {}

    create(campaignProduct: ICampaignProductSalesBen): Observable<EntityResponseType> {
        return this.http.post<ICampaignProductSalesBen>(this.resourceUrl, campaignProduct, { observe: 'response' });
    }

    update(campaignProduct: ICampaignProductSalesBen): Observable<EntityResponseType> {
        return this.http.put<ICampaignProductSalesBen>(this.resourceUrl, campaignProduct, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICampaignProductSalesBen>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICampaignProductSalesBen[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
