import { Moment } from 'moment';

export interface ICampaignSalesBen {
    id?: number;
    campaignName?: string;
    fromDate?: Moment;
    toDate?: Moment;
    isActive?: boolean;
    supplierId?: number;
}

export class CampaignSalesBen implements ICampaignSalesBen {
    constructor(
        public id?: number,
        public campaignName?: string,
        public fromDate?: Moment,
        public toDate?: Moment,
        public isActive?: boolean,
        public supplierId?: number
    ) {
        this.isActive = this.isActive || false;
    }
}
