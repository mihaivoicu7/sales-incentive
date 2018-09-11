/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SalesBenefitTestModule } from '../../../test.module';
import { SellerSalesBenDetailComponent } from 'app/entities/seller-sales-ben/seller-sales-ben-detail.component';
import { SellerSalesBen } from 'app/shared/model/seller-sales-ben.model';

describe('Component Tests', () => {
    describe('SellerSalesBen Management Detail Component', () => {
        let comp: SellerSalesBenDetailComponent;
        let fixture: ComponentFixture<SellerSalesBenDetailComponent>;
        const route = ({ data: of({ seller: new SellerSalesBen(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesBenefitTestModule],
                declarations: [SellerSalesBenDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SellerSalesBenDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SellerSalesBenDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.seller).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
