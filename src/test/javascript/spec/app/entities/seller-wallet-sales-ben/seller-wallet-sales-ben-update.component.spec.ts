/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SalesBenefitTestModule } from '../../../test.module';
import { SellerWalletSalesBenUpdateComponent } from 'app/entities/seller-wallet-sales-ben/seller-wallet-sales-ben-update.component';
import { SellerWalletSalesBenService } from 'app/entities/seller-wallet-sales-ben/seller-wallet-sales-ben.service';
import { SellerWalletSalesBen } from 'app/shared/model/seller-wallet-sales-ben.model';

describe('Component Tests', () => {
    describe('SellerWalletSalesBen Management Update Component', () => {
        let comp: SellerWalletSalesBenUpdateComponent;
        let fixture: ComponentFixture<SellerWalletSalesBenUpdateComponent>;
        let service: SellerWalletSalesBenService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesBenefitTestModule],
                declarations: [SellerWalletSalesBenUpdateComponent]
            })
                .overrideTemplate(SellerWalletSalesBenUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SellerWalletSalesBenUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SellerWalletSalesBenService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SellerWalletSalesBen(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sellerWallet = entity;
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
                    const entity = new SellerWalletSalesBen();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sellerWallet = entity;
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
