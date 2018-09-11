import { Moment } from 'moment';

export interface ISellerTransactionSalesBen {
    id?: number;
    confirmed?: boolean;
    amount?: number;
    transactionDate?: Moment;
    campaignProductId?: number;
    sellerId?: number;
}

export class SellerTransactionSalesBen implements ISellerTransactionSalesBen {
    constructor(
        public id?: number,
        public confirmed?: boolean,
        public amount?: number,
        public transactionDate?: Moment,
        public campaignProductId?: number,
        public sellerId?: number
    ) {
        this.confirmed = this.confirmed || false;
    }
}
