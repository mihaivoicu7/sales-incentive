import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProductSalesBen } from 'app/shared/model/product-sales-ben.model';

type EntityResponseType = HttpResponse<IProductSalesBen>;
type EntityArrayResponseType = HttpResponse<IProductSalesBen[]>;

@Injectable({ providedIn: 'root' })
export class ProductSalesBenService {
    private resourceUrl = SERVER_API_URL + 'api/products';

    constructor(private http: HttpClient) {}

    create(product: IProductSalesBen): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(product);
        return this.http
            .post<IProductSalesBen>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(product: IProductSalesBen): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(product);
        return this.http
            .put<IProductSalesBen>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IProductSalesBen>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IProductSalesBen[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(product: IProductSalesBen): IProductSalesBen {
        const copy: IProductSalesBen = Object.assign({}, product, {
            createDate: product.createDate != null && product.createDate.isValid() ? product.createDate.toJSON() : null,
            updateDate: product.updateDate != null && product.updateDate.isValid() ? product.updateDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        res.body.updateDate = res.body.updateDate != null ? moment(res.body.updateDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((product: IProductSalesBen) => {
            product.createDate = product.createDate != null ? moment(product.createDate) : null;
            product.updateDate = product.updateDate != null ? moment(product.updateDate) : null;
        });
        return res;
    }
}
