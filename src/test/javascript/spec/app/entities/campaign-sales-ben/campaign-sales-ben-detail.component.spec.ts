/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SalesBenefitTestModule } from '../../../test.module';
import { CampaignSalesBenDetailComponent } from 'app/entities/campaign-sales-ben/campaign-sales-ben-detail.component';
import { CampaignSalesBen } from 'app/shared/model/campaign-sales-ben.model';

describe('Component Tests', () => {
    describe('CampaignSalesBen Management Detail Component', () => {
        let comp: CampaignSalesBenDetailComponent;
        let fixture: ComponentFixture<CampaignSalesBenDetailComponent>;
        const route = ({ data: of({ campaign: new CampaignSalesBen(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesBenefitTestModule],
                declarations: [CampaignSalesBenDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CampaignSalesBenDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CampaignSalesBenDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.campaign).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
