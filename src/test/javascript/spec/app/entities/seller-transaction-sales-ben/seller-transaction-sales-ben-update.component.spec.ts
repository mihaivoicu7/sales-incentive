/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SalesBenefitTestModule } from '../../../test.module';
import { SellerTransactionSalesBenUpdateComponent } from 'app/entities/seller-transaction-sales-ben/seller-transaction-sales-ben-update.component';
import { SellerTransactionSalesBenService } from 'app/entities/seller-transaction-sales-ben/seller-transaction-sales-ben.service';
import { SellerTransactionSalesBen } from 'app/shared/model/seller-transaction-sales-ben.model';

describe('Component Tests', () => {
    describe('SellerTransactionSalesBen Management Update Component', () => {
        let comp: SellerTransactionSalesBenUpdateComponent;
        let fixture: ComponentFixture<SellerTransactionSalesBenUpdateComponent>;
        let service: SellerTransactionSalesBenService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesBenefitTestModule],
                declarations: [SellerTransactionSalesBenUpdateComponent]
            })
                .overrideTemplate(SellerTransactionSalesBenUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SellerTransactionSalesBenUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SellerTransactionSalesBenService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SellerTransactionSalesBen(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sellerTransaction = entity;
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
                    const entity = new SellerTransactionSalesBen();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sellerTransaction = entity;
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
