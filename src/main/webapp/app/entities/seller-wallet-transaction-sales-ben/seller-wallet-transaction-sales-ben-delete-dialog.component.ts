import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISellerWalletTransactionSalesBen } from 'app/shared/model/seller-wallet-transaction-sales-ben.model';
import { SellerWalletTransactionSalesBenService } from './seller-wallet-transaction-sales-ben.service';

@Component({
    selector: 'jhi-seller-wallet-transaction-sales-ben-delete-dialog',
    templateUrl: './seller-wallet-transaction-sales-ben-delete-dialog.component.html'
})
export class SellerWalletTransactionSalesBenDeleteDialogComponent {
    sellerWalletTransaction: ISellerWalletTransactionSalesBen;

    constructor(
        private sellerWalletTransactionService: SellerWalletTransactionSalesBenService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sellerWalletTransactionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sellerWalletTransactionListModification',
                content: 'Deleted an sellerWalletTransaction'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-seller-wallet-transaction-sales-ben-delete-popup',
    template: ''
})
export class SellerWalletTransactionSalesBenDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sellerWalletTransaction }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SellerWalletTransactionSalesBenDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.sellerWalletTransaction = sellerWalletTransaction;
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
