/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SalesBenefitTestModule } from '../../../test.module';
import { SellerWalletSalesBenDetailComponent } from 'app/entities/seller-wallet-sales-ben/seller-wallet-sales-ben-detail.component';
import { SellerWalletSalesBen } from 'app/shared/model/seller-wallet-sales-ben.model';

describe('Component Tests', () => {
    describe('SellerWalletSalesBen Management Detail Component', () => {
        let comp: SellerWalletSalesBenDetailComponent;
        let fixture: ComponentFixture<SellerWalletSalesBenDetailComponent>;
        const route = ({ data: of({ sellerWallet: new SellerWalletSalesBen(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesBenefitTestModule],
                declarations: [SellerWalletSalesBenDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SellerWalletSalesBenDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SellerWalletSalesBenDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.sellerWallet).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
