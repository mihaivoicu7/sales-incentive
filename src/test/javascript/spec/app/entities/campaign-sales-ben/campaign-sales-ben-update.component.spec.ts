/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SalesBenefitTestModule } from '../../../test.module';
import { CampaignSalesBenUpdateComponent } from 'app/entities/campaign-sales-ben/campaign-sales-ben-update.component';
import { CampaignSalesBenService } from 'app/entities/campaign-sales-ben/campaign-sales-ben.service';
import { CampaignSalesBen } from 'app/shared/model/campaign-sales-ben.model';

describe('Component Tests', () => {
    describe('CampaignSalesBen Management Update Component', () => {
        let comp: CampaignSalesBenUpdateComponent;
        let fixture: ComponentFixture<CampaignSalesBenUpdateComponent>;
        let service: CampaignSalesBenService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesBenefitTestModule],
                declarations: [CampaignSalesBenUpdateComponent]
            })
                .overrideTemplate(CampaignSalesBenUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CampaignSalesBenUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampaignSalesBenService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CampaignSalesBen(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.campaign = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CampaignSalesBen();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.campaign = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
