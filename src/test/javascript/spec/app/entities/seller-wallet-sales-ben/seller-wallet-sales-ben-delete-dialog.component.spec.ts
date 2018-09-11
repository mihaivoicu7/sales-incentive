/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SalesBenefitTestModule } from '../../../test.module';
import { SellerWalletSalesBenDeleteDialogComponent } from 'app/entities/seller-wallet-sales-ben/seller-wallet-sales-ben-delete-dialog.component';
import { SellerWalletSalesBenService } from 'app/entities/seller-wallet-sales-ben/seller-wallet-sales-ben.service';

describe('Component Tests', () => {
    describe('SellerWalletSalesBen Management Delete Component', () => {
        let comp: SellerWalletSalesBenDeleteDialogComponent;
        let fixture: ComponentFixture<SellerWalletSalesBenDeleteDialogComponent>;
        let service: SellerWalletSalesBenService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesBenefitTestModule],
                declarations: [SellerWalletSalesBenDeleteDialogComponent]
            })
                .overrideTemplate(SellerWalletSalesBenDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SellerWalletSalesBenDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SellerWalletSalesBenService);
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
