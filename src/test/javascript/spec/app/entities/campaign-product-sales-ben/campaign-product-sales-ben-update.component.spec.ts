/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SalesBenefitTestModule } from '../../../test.module';
import { CampaignProductSalesBenUpdateComponent } from 'app/entities/campaign-product-sales-ben/campaign-product-sales-ben-update.component';
import { CampaignProductSalesBenService } from 'app/entities/campaign-product-sales-ben/campaign-product-sales-ben.service';
import { CampaignProductSalesBen } from 'app/shared/model/campaign-product-sales-ben.model';

describe('Component Tests', () => {
    describe('CampaignProductSalesBen Management Update Component', () => {
        let comp: CampaignProductSalesBenUpdateComponent;
        let fixture: ComponentFixture<CampaignProductSalesBenUpdateComponent>;
        let service: CampaignProductSalesBenService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesBenefitTestModule],
                declarations: [CampaignProductSalesBenUpdateComponent]
            })
                .overrideTemplate(CampaignProductSalesBenUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CampaignProductSalesBenUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampaignProductSalesBenService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CampaignProductSalesBen(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.campaignProduct = entity;
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
                    const entity = new CampaignProductSalesBen();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.campaignProduct = entity;
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
