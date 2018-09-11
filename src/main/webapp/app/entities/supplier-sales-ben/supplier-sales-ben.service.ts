import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISupplierSalesBen } from 'app/shared/model/supplier-sales-ben.model';

type EntityResponseType = HttpResponse<ISupplierSalesBen>;
type EntityArrayResponseType = HttpResponse<ISupplierSalesBen[]>;

@Injectable({ providedIn: 'root' })
export class SupplierSalesBenService {
    private resourceUrl = SERVER_API_URL + 'api/suppliers';

    constructor(private http: HttpClient) {}

    create(supplier: ISupplierSalesBen): Observable<EntityResponseType> {
        return this.http.post<ISupplierSalesBen>(this.resourceUrl, supplier, { observe: 'response' });
    }

    update(supplier: ISupplierSalesBen): Observable<EntityResponseType> {
        return this.http.put<ISupplierSalesBen>(this.resourceUrl, supplier, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISupplierSalesBen>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISupplierSalesBen[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
