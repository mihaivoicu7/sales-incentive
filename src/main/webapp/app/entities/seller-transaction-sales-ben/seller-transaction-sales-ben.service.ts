import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISellerTransactionSalesBen } from 'app/shared/model/seller-transaction-sales-ben.model';

type EntityResponseType = HttpResponse<ISellerTransactionSalesBen>;
type EntityArrayResponseType = HttpResponse<ISellerTransactionSalesBen[]>;

@Injectable({ providedIn: 'root' })
export class SellerTransactionSalesBenService {
    private resourceUrl = SERVER_API_URL + 'api/seller-transactions';

    constructor(private http: HttpClient) {}

    create(sellerTransaction: ISellerTransactionSalesBen): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(sellerTransaction);
        return this.http
            .post<ISellerTransactionSalesBen>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(sellerTransaction: ISellerTransactionSalesBen): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(sellerTransaction);
        return this.http
            .put<ISellerTransactionSalesBen>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISellerTransactionSalesBen>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISellerTransactionSalesBen[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(sellerTransaction: ISellerTransactionSalesBen): ISellerTransactionSalesBen {
        const copy: ISellerTransactionSalesBen = Object.assign({}, sellerTransaction, {
            transactionDate:
                sellerTransaction.transactionDate != null && sellerTransaction.transactionDate.isValid()
                    ? sellerTransaction.transactionDate.toJSON()
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.transactionDate = res.body.transactionDate != null ? moment(res.body.transactionDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((sellerTransaction: ISellerTransactionSalesBen) => {
            sellerTransaction.transactionDate =
                sellerTransaction.transactionDate != null ? moment(sellerTransaction.transactionDate) : null;
        });
        return res;
    }
}
