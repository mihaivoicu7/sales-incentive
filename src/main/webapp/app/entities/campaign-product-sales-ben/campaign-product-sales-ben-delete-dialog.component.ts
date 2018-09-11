import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICampaignProductSalesBen } from 'app/shared/model/campaign-product-sales-ben.model';
import { CampaignProductSalesBenService } from './campaign-product-sales-ben.service';

@Component({
    selector: 'jhi-campaign-product-sales-ben-delete-dialog',
    templateUrl: './campaign-product-sales-ben-delete-dialog.component.html'
})
export class CampaignProductSalesBenDeleteDialogComponent {
    campaignProduct: ICampaignProductSalesBen;

    constructor(
        private campaignProductService: CampaignProductSalesBenService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.campaignProductService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'campaignProductListModification',
                content: 'Deleted an campaignProduct'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-campaign-product-sales-ben-delete-popup',
    template: ''
})
export class CampaignProductSalesBenDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ campaignProduct }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CampaignProductSalesBenDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.campaignProduct = campaignProduct;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
