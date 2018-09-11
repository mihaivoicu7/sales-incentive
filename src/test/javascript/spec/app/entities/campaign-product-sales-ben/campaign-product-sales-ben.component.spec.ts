/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SalesBenefitTestModule } from '../../../test.module';
import { CampaignProductSalesBenComponent } from 'app/entities/campaign-product-sales-ben/campaign-product-sales-ben.component';
import { CampaignProductSalesBenService } from 'app/entities/campaign-product-sales-ben/campaign-product-sales-ben.service';
import { CampaignProductSalesBen } from 'app/shared/model/campaign-product-sales-ben.model';

describe('Component Tests', () => {
    describe('CampaignProductSalesBen Management Component', () => {
        let comp: CampaignProductSalesBenComponent;
        let fixture: ComponentFixture<CampaignProductSalesBenComponent>;
        let service: CampaignProductSalesBenService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesBenefitTestModule],
                declarations: [CampaignProductSalesBenComponent],
                providers: []
            })
                .overrideTemplate(CampaignProductSalesBenComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CampaignProductSalesBenComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CampaignProductSalesBenService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CampaignProductSalesBen(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.campaignProducts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
