export interface ICampaignProductSalesBen {
    id?: number;
    price?: number;
    isActive?: boolean;
    discount?: number;
    campaignId?: number;
    productId?: number;
}

export class CampaignProductSalesBen implements ICampaignProductSalesBen {
    constructor(
        public id?: number,
        public price?: number,
        public isActive?: boolean,
        public discount?: number,
        public campaignId?: number,
        public productId?: number
    ) {
        this.isActive = this.isActive || false;
    }
}
