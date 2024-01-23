import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
 
@Directive({
    selector:'[appSelectvalidator]',
    providers:[{
        provide:NG_VALIDATORS,
        useExisting:SelectRequiredValidatorDirective,
        multi:true
    }]
 
})
export class SelectRequiredValidatorDirective implements Validator{
    validate(control: AbstractControl): { [key: string]: boolean } | null {
        // Your custom validation logic goes here
        const valid = /^[a-zA-Z\s]*$/.test(control.value);
     
        // Return an object if the validation fails
        return valid ? null : { validName: false };
      }
   
}