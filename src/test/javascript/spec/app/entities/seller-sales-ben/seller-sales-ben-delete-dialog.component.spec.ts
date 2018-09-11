/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SalesBenefitTestModule } from '../../../test.module';
import { SellerSalesBenDeleteDialogComponent } from 'app/entities/seller-sales-ben/seller-sales-ben-delete-dialog.component';
import { SellerSalesBenService } from 'app/entities/seller-sales-ben/seller-sales-ben.service';

describe('Component Tests', () => {
    describe('SellerSalesBen Management Delete Component', () => {
        let comp: SellerSalesBenDeleteDialogComponent;
        let fixture: ComponentFixture<SellerSalesBenDeleteDialogComponent>;
        let service: SellerSalesBenService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesBenefitTestModule],
                declarations: [SellerSalesBenDeleteDialogComponent]
            })
                .overrideTemplate(SellerSalesBenDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SellerSalesBenDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SellerSalesBenService);
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
