import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISellerWalletTransactionSalesBen } from 'app/shared/model/seller-wallet-transaction-sales-ben.model';

type EntityResponseType = HttpResponse<ISellerWalletTransactionSalesBen>;
type EntityArrayResponseType = HttpResponse<ISellerWalletTransactionSalesBen[]>;

@Injectable({ providedIn: 'root' })
export class SellerWalletTransactionSalesBenService {
    private resourceUrl = SERVER_API_URL + 'api/seller-wallet-transactions';

    constructor(private http: HttpClient) {}

    create(sellerWalletTransaction: ISellerWalletTransactionSalesBen): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(sellerWalletTransaction);
        return this.http
            .post<ISellerWalletTransactionSalesBen>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(sellerWalletTransaction: ISellerWalletTransactionSalesBen): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(sellerWalletTransaction);
        return this.http
            .put<ISellerWalletTransactionSalesBen>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISellerWalletTransactionSalesBen>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISellerWalletTransactionSalesBen[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(sellerWalletTransaction: ISellerWalletTransactionSalesBen): ISellerWalletTransactionSalesBen {
        const copy: ISellerWalletTransactionSalesBen = Object.assign({}, sellerWalletTransaction, {
            transactionDate:
                sellerWalletTransaction.transactionDate != null && sellerWalletTransaction.transactionDate.isValid()
                    ? sellerWalletTransaction.transactionDate.toJSON()
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.transactionDate = res.body.transactionDate != null ? moment(res.body.transactionDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((sellerWalletTransaction: ISellerWalletTransactionSalesBen) => {
            sellerWalletTransaction.transactionDate =
                sellerWalletTransaction.transactionDate != null ? moment(sellerWalletTransaction.transactionDate) : null;
        });
        return res;
    }
}
