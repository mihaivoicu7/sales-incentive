/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SalesBenefitTestModule } from '../../../test.module';
import { ProductSalesBenDetailComponent } from 'app/entities/product-sales-ben/product-sales-ben-detail.component';
import { ProductSalesBen } from 'app/shared/model/product-sales-ben.model';

describe('Component Tests', () => {
    describe('ProductSalesBen Management Detail Component', () => {
        let comp: ProductSalesBenDetailComponent;
        let fixture: ComponentFixture<ProductSalesBenDetailComponent>;
        const route = ({ data: of({ product: new ProductSalesBen(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesBenefitTestModule],
                declarations: [ProductSalesBenDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProductSalesBenDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductSalesBenDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.product).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
