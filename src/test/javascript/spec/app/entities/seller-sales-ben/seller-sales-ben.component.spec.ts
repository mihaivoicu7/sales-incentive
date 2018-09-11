/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SalesBenefitTestModule } from '../../../test.module';
import { SellerSalesBenComponent } from 'app/entities/seller-sales-ben/seller-sales-ben.component';
import { SellerSalesBenService } from 'app/entities/seller-sales-ben/seller-sales-ben.service';
import { SellerSalesBen } from 'app/shared/model/seller-sales-ben.model';

describe('Component Tests', () => {
    describe('SellerSalesBen Management Component', () => {
        let comp: SellerSalesBenComponent;
        let fixture: ComponentFixture<SellerSalesBenComponent>;
        let service: SellerSalesBenService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesBenefitTestModule],
                declarations: [SellerSalesBenComponent],
                providers: []
            })
                .overrideTemplate(SellerSalesBenComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SellerSalesBenComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SellerSalesBenService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SellerSalesBen(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.sellers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
