/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SalesBenefitTestModule } from '../../../test.module';
import { SellerTransactionSalesBenDetailComponent } from 'app/entities/seller-transaction-sales-ben/seller-transaction-sales-ben-detail.component';
import { SellerTransactionSalesBen } from 'app/shared/model/seller-transaction-sales-ben.model';

describe('Component Tests', () => {
    describe('SellerTransactionSalesBen Management Detail Component', () => {
        let comp: SellerTransactionSalesBenDetailComponent;
        let fixture: ComponentFixture<SellerTransactionSalesBenDetailComponent>;
        const route = ({ data: of({ sellerTransaction: new SellerTransactionSalesBen(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesBenefitTestModule],
                declarations: [SellerTransactionSalesBenDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SellerTransactionSalesBenDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SellerTransactionSalesBenDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.sellerTransaction).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
