import { Moment } from 'moment';

export const enum WalletTransactionType {
    IN_PENDING = 'IN_PENDING',
    IN_CONFIRMED = 'IN_CONFIRMED',
    OUT_PENDING = 'OUT_PENDING',
    OUT_CONFIRMED = 'OUT_CONFIRMED'
}

export interface ISellerWalletTransactionSalesBen {
    id?: number;
    amount?: number;
    transactionType?: WalletTransactionType;
    transactionDate?: Moment;
    sellerWalletId?: number;
}

export class SellerWalletTransactionSalesBen implements ISellerWalletTransactionSalesBen {
    constructor(
        public id?: number,
        public amount?: number,
        public transactionType?: WalletTransactionType,
        public transactionDate?: Moment,
        public sellerWalletId?: number
    ) {}
}
