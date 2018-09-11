/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SalesBenefitTestModule } from '../../../test.module';
import { SupplierSalesBenDeleteDialogComponent } from 'app/entities/supplier-sales-ben/supplier-sales-ben-delete-dialog.component';
import { SupplierSalesBenService } from 'app/entities/supplier-sales-ben/supplier-sales-ben.service';

describe('Component Tests', () => {
    describe('SupplierSalesBen Management Delete Component', () => {
        let comp: SupplierSalesBenDeleteDialogComponent;
        let fixture: ComponentFixture<SupplierSalesBenDeleteDialogComponent>;
        let service: SupplierSalesBenService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesBenefitTestModule],
                declarations: [SupplierSalesBenDeleteDialogComponent]
            })
                .overrideTemplate(SupplierSalesBenDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SupplierSalesBenDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupplierSalesBenService);
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
