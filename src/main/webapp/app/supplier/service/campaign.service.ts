import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICampaignSalesBen } from 'app/shared/model/campaign-sales-ben.model';

type EntityResponseType = HttpResponse<ICampaignSalesBen>;
type EntityArrayResponseType = HttpResponse<ICampaignSalesBen[]>;

@Injectable({ providedIn: 'root' })
export class CampaignService {
    private resourceUrl = SERVER_API_URL + 'api/supplier/campaigns';

    constructor(private http: HttpClient) {}

    create(campaign: ICampaignSalesBen): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(campaign);
        return this.http
            .post<ICampaignSalesBen>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(campaign: ICampaignSalesBen): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(campaign);
        return this.http
            .put<ICampaignSalesBen>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICampaignSalesBen>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICampaignSalesBen[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(campaign: ICampaignSalesBen): ICampaignSalesBen {
        const copy: ICampaignSalesBen = Object.assign({}, campaign, {
            fromDate: campaign.fromDate != null && campaign.fromDate.isValid() ? campaign.fromDate.toJSON() : null,
            toDate: campaign.toDate != null && campaign.toDate.isValid() ? campaign.toDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.fromDate = res.body.fromDate != null ? moment(res.body.fromDate) : null;
        res.body.toDate = res.body.toDate != null ? moment(res.body.toDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((campaign: ICampaignSalesBen) => {
            campaign.fromDate = campaign.fromDate != null ? moment(campaign.fromDate) : null;
            campaign.toDate = campaign.toDate != null ? moment(campaign.toDate) : null;
        });
        return res;
    }
}
