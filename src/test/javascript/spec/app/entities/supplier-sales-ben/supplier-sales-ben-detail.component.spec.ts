/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SalesBenefitTestModule } from '../../../test.module';
import { SupplierSalesBenDetailComponent } from 'app/entities/supplier-sales-ben/supplier-sales-ben-detail.component';
import { SupplierSalesBen } from 'app/shared/model/supplier-sales-ben.model';

describe('Component Tests', () => {
    describe('SupplierSalesBen Management Detail Component', () => {
        let comp: SupplierSalesBenDetailComponent;
        let fixture: ComponentFixture<SupplierSalesBenDetailComponent>;
        const route = ({ data: of({ supplier: new SupplierSalesBen(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesBenefitTestModule],
                declarations: [SupplierSalesBenDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SupplierSalesBenDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SupplierSalesBenDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.supplier).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
