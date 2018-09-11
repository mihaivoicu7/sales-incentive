/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SalesBenefitTestModule } from '../../../test.module';
import { SellerWalletTransactionSalesBenUpdateComponent } from 'app/entities/seller-wallet-transaction-sales-ben/seller-wallet-transaction-sales-ben-update.component';
import { SellerWalletTransactionSalesBenService } from 'app/entities/seller-wallet-transaction-sales-ben/seller-wallet-transaction-sales-ben.service';
import { SellerWalletTransactionSalesBen } from 'app/shared/model/seller-wallet-transaction-sales-ben.model';

describe('Component Tests', () => {
    describe('SellerWalletTransactionSalesBen Management Update Component', () => {
        let comp: SellerWalletTransactionSalesBenUpdateComponent;
        let fixture: ComponentFixture<SellerWalletTransactionSalesBenUpdateComponent>;
        let service: SellerWalletTransactionSalesBenService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesBenefitTestModule],
                declarations: [SellerWalletTransactionSalesBenUpdateComponent]
            })
                .overrideTemplate(SellerWalletTransactionSalesBenUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SellerWalletTransactionSalesBenUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SellerWalletTransactionSalesBenService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SellerWalletTransactionSalesBen(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sellerWalletTransaction = entity;
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
                    const entity = new SellerWalletTransactionSalesBen();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sellerWalletTransaction = entity;
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
