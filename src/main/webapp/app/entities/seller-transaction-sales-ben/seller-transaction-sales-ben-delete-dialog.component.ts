import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISellerTransactionSalesBen } from 'app/shared/model/seller-transaction-sales-ben.model';
import { SellerTransactionSalesBenService } from './seller-transaction-sales-ben.service';

@Component({
    selector: 'jhi-seller-transaction-sales-ben-delete-dialog',
    templateUrl: './seller-transaction-sales-ben-delete-dialog.component.html'
})
export class SellerTransactionSalesBenDeleteDialogComponent {
    sellerTransaction: ISellerTransactionSalesBen;

    constructor(
        private sellerTransactionService: SellerTransactionSalesBenService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sellerTransactionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sellerTransactionListModification',
                content: 'Deleted an sellerTransaction'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-seller-transaction-sales-ben-delete-popup',
    template: ''
})
export class SellerTransactionSalesBenDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sellerTransaction }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SellerTransactionSalesBenDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.sellerTransaction = sellerTransaction;
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
