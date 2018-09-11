import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISellerSalesBen } from 'app/shared/model/seller-sales-ben.model';
import { SellerSalesBenService } from './seller-sales-ben.service';

@Component({
    selector: 'jhi-seller-sales-ben-delete-dialog',
    templateUrl: './seller-sales-ben-delete-dialog.component.html'
})
export class SellerSalesBenDeleteDialogComponent {
    seller: ISellerSalesBen;

    constructor(private sellerService: SellerSalesBenService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sellerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sellerListModification',
                content: 'Deleted an seller'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-seller-sales-ben-delete-popup',
    template: ''
})
export class SellerSalesBenDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ seller }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SellerSalesBenDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.seller = seller;
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
