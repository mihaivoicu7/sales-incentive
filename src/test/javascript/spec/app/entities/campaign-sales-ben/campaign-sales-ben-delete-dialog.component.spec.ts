/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SalesBenefitTestModule } from '../../../test.module';
import { CampaignSalesBenDeleteDialogComponent } from 'app/entities/campaign-sales-ben/campaign-sales-ben-delete-dialog.component';
import { CampaignSalesBenService } from 'app/entities/campaign-sales-ben/campaign-sales-ben.service';

describe('Component Tests', () => {
    describe('CampaignSalesBen Management Delete Component', () => {
        let comp: CampaignSalesBenDeleteDialogComponent;
        let fixture: ComponentFixture<CampaignSalesBenDeleteDialogComponent>;
        let service: CampaignSalesBenService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesBenefitTestModule],
                declarations: [CampaignSalesBenDeleteDialogComponent]
            })
                .overrideTemplate(CampaignSalesBenDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CampaignSalesBenDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampaignSalesBenService);
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
