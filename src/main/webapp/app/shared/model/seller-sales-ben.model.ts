export interface ISellerSalesBen {
    id?: number;
    isActive?: boolean;
    userId?: number;
}

export class SellerSalesBen implements ISellerSalesBen {
    constructor(public id?: number, public isActive?: boolean, public userId?: number) {
        this.isActive = this.isActive || false;
    }
}
