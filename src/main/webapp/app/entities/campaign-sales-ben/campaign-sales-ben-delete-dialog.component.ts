import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICampaignSalesBen } from 'app/shared/model/campaign-sales-ben.model';
import { CampaignSalesBenService } from './campaign-sales-ben.service';

@Component({
    selector: 'jhi-campaign-sales-ben-delete-dialog',
    templateUrl: './campaign-sales-ben-delete-dialog.component.html'
})
export class CampaignSalesBenDeleteDialogComponent {
    campaign: ICampaignSalesBen;

    constructor(
        private campaignService: CampaignSalesBenService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.campaignService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'campaignListModification',
                content: 'Deleted an campaign'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-campaign-sales-ben-delete-popup',
    template: ''
})
export class CampaignSalesBenDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ campaign }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CampaignSalesBenDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.campaign = campaign;
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
