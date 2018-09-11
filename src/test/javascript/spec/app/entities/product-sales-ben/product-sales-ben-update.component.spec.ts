/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SalesBenefitTestModule } from '../../../test.module';
import { ProductSalesBenUpdateComponent } from 'app/entities/product-sales-ben/product-sales-ben-update.component';
import { ProductSalesBenService } from 'app/entities/product-sales-ben/product-sales-ben.service';
import { ProductSalesBen } from 'app/shared/model/product-sales-ben.model';

describe('Component Tests', () => {
    describe('ProductSalesBen Management Update Component', () => {
        let comp: ProductSalesBenUpdateComponent;
        let fixture: ComponentFixture<ProductSalesBenUpdateComponent>;
        let service: ProductSalesBenService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesBenefitTestModule],
                declarations: [ProductSalesBenUpdateComponent]
            })
                .overrideTemplate(ProductSalesBenUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProductSalesBenUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductSalesBenService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProductSalesBen(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.product = entity;
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
                    const entity = new ProductSalesBen();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.product = entity;
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
