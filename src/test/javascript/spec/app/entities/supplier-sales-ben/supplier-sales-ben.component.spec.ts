/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SalesBenefitTestModule } from '../../../test.module';
import { SupplierSalesBenComponent } from 'app/entities/supplier-sales-ben/supplier-sales-ben.component';
import { SupplierSalesBenService } from 'app/entities/supplier-sales-ben/supplier-sales-ben.service';
import { SupplierSalesBen } from 'app/shared/model/supplier-sales-ben.model';

describe('Component Tests', () => {
    describe('SupplierSalesBen Management Component', () => {
        let comp: SupplierSalesBenComponent;
        let fixture: ComponentFixture<SupplierSalesBenComponent>;
        let service: SupplierSalesBenService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SalesBenefitTestModule],
                declarations: [SupplierSalesBenComponent],
                providers: []
            })
                .overrideTemplate(SupplierSalesBenComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SupplierSalesBenComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupplierSalesBenService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SupplierSalesBen(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.suppliers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
