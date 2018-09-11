/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SalesBenefitTestModule } from '../../../test.module';
import { SellerWalletTransactionSalesBenDetailComponent } from 'app/entities/seller-wallet-transaction-sales-ben/seller-wallet-transaction-sales-ben-detail.component';
import { SellerWalletTransactionSalesBen } from 'app/shared/model/seller-wallet-transaction-sales-ben.model';

describe('Component Tests', () => {
    describe('SellerWalletTransactionSalesBen Management Detail Component', () => {
        let comp: SellerWalletTransactionSalesBenDetailComponent;
        let fixture: ComponentFixture<SellerWalletTransactionSalesBenDetailComponent>;
        const route = ({ data: of({ sellerWalletTransaction: new SellerWalletTransactionSalesBen(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesBenefitTestModule],
                declarations: [SellerWalletTransactionSalesBenDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SellerWalletTransactionSalesBenDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SellerWalletTransactionSalesBenDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.sellerWalletTransaction).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
