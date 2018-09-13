import {Directive, Input, SimpleChanges} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, Validator, ValidatorFn} from "@angular/forms";
import {ValidationErrors} from '@angular/forms';
import {b} from "@angular/core/src/render3";

@Directive({
    selector: '[jhiDateBiggerThan]',
    providers: [{provide: NG_VALIDATORS, useExisting: DateBiggerThanValidator, multi: true}]
})
export class DateBiggerThanValidator implements Validator {
    @Input('jhiDateBiggerThan') jhiDateBiggerThan: string;

    validate(control: AbstractControl): { [key: string]: any } | null {
        if (!(control && control.value)) {
            return null;
        }
        const smallerDate = new Date(this.jhiDateBiggerThan);
        const biggerDate = new Date(control.value.toString());
        if(smallerDate<biggerDate) {
            return null;
        }
        return {"isBiggerDate":{value:biggerDate>smallerDate}};
    }
}
