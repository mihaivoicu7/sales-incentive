/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SalesBenefitTestModule } from '../../../test.module';
import { SellerWalletSalesBenComponent } from 'app/entities/seller-wallet-sales-ben/seller-wallet-sales-ben.component';
import { SellerWalletSalesBenService } from 'app/entities/seller-wallet-sales-ben/seller-wallet-sales-ben.service';
import { SellerWalletSalesBen } from 'app/shared/model/seller-wallet-sales-ben.model';

describe('Component Tests', () => {
    describe('SellerWalletSalesBen Management Component', () => {
        let comp: SellerWalletSalesBenComponent;
        let fixture: ComponentFixture<SellerWalletSalesBenComponent>;
        let service: SellerWalletSalesBenService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesBenefitTestModule],
                declarations: [SellerWalletSalesBenComponent],
                providers: []
            })
                .overrideTemplate(SellerWalletSalesBenComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SellerWalletSalesBenComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SellerWalletSalesBenService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SellerWalletSalesBen(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.sellerWallets[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
