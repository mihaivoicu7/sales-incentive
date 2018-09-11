import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISupplierSalesBen } from 'app/shared/model/supplier-sales-ben.model';
import { SupplierSalesBenService } from './supplier-sales-ben.service';

@Component({
    selector: 'jhi-supplier-sales-ben-delete-dialog',
    templateUrl: './supplier-sales-ben-delete-dialog.component.html'
})
export class SupplierSalesBenDeleteDialogComponent {
    supplier: ISupplierSalesBen;

    constructor(
        private supplierService: SupplierSalesBenService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.supplierService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'supplierListModification',
                content: 'Deleted an supplier'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-supplier-sales-ben-delete-popup',
    template: ''
})
export class SupplierSalesBenDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ supplier }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SupplierSalesBenDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.supplier = supplier;
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
