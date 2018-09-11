/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SalesBenefitTestModule } from '../../../test.module';
import { ProductSalesBenDeleteDialogComponent } from 'app/entities/product-sales-ben/product-sales-ben-delete-dialog.component';
import { ProductSalesBenService } from 'app/entities/product-sales-ben/product-sales-ben.service';

describe('Component Tests', () => {
    describe('ProductSalesBen Management Delete Component', () => {
        let comp: ProductSalesBenDeleteDialogComponent;
        let fixture: ComponentFixture<ProductSalesBenDeleteDialogComponent>;
        let service: ProductSalesBenService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesBenefitTestModule],
                declarations: [ProductSalesBenDeleteDialogComponent]
            })
                .overrideTemplate(ProductSalesBenDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductSalesBenDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductSalesBenService);
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
