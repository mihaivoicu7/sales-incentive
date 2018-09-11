/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SalesBenefitTestModule } from '../../../test.module';
import { SellerWalletTransactionSalesBenDeleteDialogComponent } from 'app/entities/seller-wallet-transaction-sales-ben/seller-wallet-transaction-sales-ben-delete-dialog.component';
import { SellerWalletTransactionSalesBenService } from 'app/entities/seller-wallet-transaction-sales-ben/seller-wallet-transaction-sales-ben.service';

describe('Component Tests', () => {
    describe('SellerWalletTransactionSalesBen Management Delete Component', () => {
        let comp: SellerWalletTransactionSalesBenDeleteDialogComponent;
        let fixture: ComponentFixture<SellerWalletTransactionSalesBenDeleteDialogComponent>;
        let service: SellerWalletTransactionSalesBenService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesBenefitTestModule],
                declarations: [SellerWalletTransactionSalesBenDeleteDialogComponent]
            })
                .overrideTemplate(SellerWalletTransactionSalesBenDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SellerWalletTransactionSalesBenDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SellerWalletTransactionSalesBenService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
