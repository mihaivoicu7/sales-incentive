import { Moment } from 'moment';

export interface IProductSalesBen {
    id?: number;
    productName?: string;
    productCode?: string;
    price?: number;
    isActive?: boolean;
    createDate?: Moment;
    updateDate?: Moment;
    supplierId?: number;
}

export class ProductSalesBen implements IProductSalesBen {
    constructor(
        public id?: number,
        public productName?: string,
        public productCode?: string,
        public price?: number,
        public isActive?: boolean,
        public createDate?: Moment,
        public updateDate?: Moment,
        public supplierId?: number
    ) {
        this.isActive = this.isActive || false;
    }
}
