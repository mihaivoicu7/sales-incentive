/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SalesBenefitTestModule } from '../../../test.module';
import { CampaignProductSalesBenDeleteDialogComponent } from 'app/entities/campaign-product-sales-ben/campaign-product-sales-ben-delete-dialog.component';
import { CampaignProductSalesBenService } from 'app/entities/campaign-product-sales-ben/campaign-product-sales-ben.service';

describe('Component Tests', () => {
    describe('CampaignProductSalesBen Management Delete Component', () => {
        let comp: CampaignProductSalesBenDeleteDialogComponent;
        let fixture: ComponentFixture<CampaignProductSalesBenDeleteDialogComponent>;
        let service: CampaignProductSalesBenService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesBenefitTestModule],
                declarations: [CampaignProductSalesBenDeleteDialogComponent]
            })
                .overrideTemplate(CampaignProductSalesBenDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CampaignProductSalesBenDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampaignProductSalesBenService);
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
