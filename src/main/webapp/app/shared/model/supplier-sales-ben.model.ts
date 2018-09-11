export interface ISupplierSalesBen {
    id?: number;
    companyName?: string;
    companyCode?: string;
    userId?: number;
}

export class SupplierSalesBen implements ISupplierSalesBen {
    constructor(public id?: number, public companyName?: string, public companyCode?: string, public userId?: number) {}
}
