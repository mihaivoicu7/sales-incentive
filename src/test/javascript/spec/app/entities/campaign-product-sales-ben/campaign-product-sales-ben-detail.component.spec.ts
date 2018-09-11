/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SalesBenefitTestModule } from '../../../test.module';
import { CampaignProductSalesBenDetailComponent } from 'app/entities/campaign-product-sales-ben/campaign-product-sales-ben-detail.component';
import { CampaignProductSalesBen } from 'app/shared/model/campaign-product-sales-ben.model';

describe('Component Tests', () => {
    describe('CampaignProductSalesBen Management Detail Component', () => {
        let comp: CampaignProductSalesBenDetailComponent;
        let fixture: ComponentFixture<CampaignProductSalesBenDetailComponent>;
        const route = ({ data: of({ campaignProduct: new CampaignProductSalesBen(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesBenefitTestModule],
                declarations: [CampaignProductSalesBenDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CampaignProductSalesBenDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CampaignProductSalesBenDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.campaignProduct).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
