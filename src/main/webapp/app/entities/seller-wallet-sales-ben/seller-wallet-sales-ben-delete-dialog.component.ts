import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISellerWalletSalesBen } from 'app/shared/model/seller-wallet-sales-ben.model';
import { SellerWalletSalesBenService } from './seller-wallet-sales-ben.service';

@Component({
    selector: 'jhi-seller-wallet-sales-ben-delete-dialog',
    templateUrl: './seller-wallet-sales-ben-delete-dialog.component.html'
})
export class SellerWalletSalesBenDeleteDialogComponent {
    sellerWallet: ISellerWalletSalesBen;

    constructor(
        private sellerWalletService: SellerWalletSalesBenService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sellerWalletService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sellerWalletListModification',
                content: 'Deleted an sellerWallet'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-seller-wallet-sales-ben-delete-popup',
    template: ''
})
export class SellerWalletSalesBenDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sellerWallet }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SellerWalletSalesBenDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.sellerWallet = sellerWallet;
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
