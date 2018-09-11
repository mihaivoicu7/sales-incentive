/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SalesBenefitTestModule } from '../../../test.module';
import { SellerSalesBenUpdateComponent } from 'app/entities/seller-sales-ben/seller-sales-ben-update.component';
import { SellerSalesBenService } from 'app/entities/seller-sales-ben/seller-sales-ben.service';
import { SellerSalesBen } from 'app/shared/model/seller-sales-ben.model';

describe('Component Tests', () => {
    describe('SellerSalesBen Management Update Component', () => {
        let comp: SellerSalesBenUpdateComponent;
        let fixture: ComponentFixture<SellerSalesBenUpdateComponent>;
        let service: SellerSalesBenService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesBenefitTestModule],
                declarations: [SellerSalesBenUpdateComponent]
            })
                .overrideTemplate(SellerSalesBenUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SellerSalesBenUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SellerSalesBenService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SellerSalesBen(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.seller = entity;
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
                    const entity = new SellerSalesBen();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.seller = entity;
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
