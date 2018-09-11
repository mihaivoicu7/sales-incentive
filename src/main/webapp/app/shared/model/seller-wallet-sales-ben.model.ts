export interface ISellerWalletSalesBen {
    id?: number;
    availableAmount?: number;
    inPendingAmount?: number;
    sellerId?: number;
}

export class SellerWalletSalesBen implements ISellerWalletSalesBen {
    constructor(public id?: number, public availableAmount?: number, public inPendingAmount?: number, public sellerId?: number) {}
}
