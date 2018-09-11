/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SalesBenefitTestModule } from '../../../test.module';
import { SupplierSalesBenUpdateComponent } from 'app/entities/supplier-sales-ben/supplier-sales-ben-update.component';
import { SupplierSalesBenService } from 'app/entities/supplier-sales-ben/supplier-sales-ben.service';
import { SupplierSalesBen } from 'app/shared/model/supplier-sales-ben.model';

describe('Component Tests', () => {
    describe('SupplierSalesBen Management Update Component', () => {
        let comp: SupplierSalesBenUpdateComponent;
        let fixture: ComponentFixture<SupplierSalesBenUpdateComponent>;
        let service: SupplierSalesBenService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesBenefitTestModule],
                declarations: [SupplierSalesBenUpdateComponent]
            })
                .overrideTemplate(SupplierSalesBenUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SupplierSalesBenUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupplierSalesBenService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SupplierSalesBen(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.supplier = entity;
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
                    const entity = new SupplierSalesBen();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.supplier = entity;
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
