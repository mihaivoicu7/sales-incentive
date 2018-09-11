import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISellerWalletSalesBen } from 'app/shared/model/seller-wallet-sales-ben.model';

type EntityResponseType = HttpResponse<ISellerWalletSalesBen>;
type EntityArrayResponseType = HttpResponse<ISellerWalletSalesBen[]>;

@Injectable({ providedIn: 'root' })
export class SellerWalletSalesBenService {
    private resourceUrl = SERVER_API_URL + 'api/seller-wallets';

    constructor(private http: HttpClient) {}

    create(sellerWallet: ISellerWalletSalesBen): Observable<EntityResponseType> {
        return this.http.post<ISellerWalletSalesBen>(this.resourceUrl, sellerWallet, { observe: 'response' });
    }

    update(sellerWallet: ISellerWalletSalesBen): Observable<EntityResponseType> {
        return this.http.put<ISellerWalletSalesBen>(this.resourceUrl, sellerWallet, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISellerWalletSalesBen>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISellerWalletSalesBen[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
