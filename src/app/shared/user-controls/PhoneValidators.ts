import {AbstractControl } from '@angular/forms';
import { ValidatorFn } from '@angular/forms'; //interface

export const phoneValidator = (): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: string } => {
    const result = /((09|03|07|08|05)+([0-9]{8})\b)/g.test(control.value);
    // console.log(`phoneValidator = ${result}`);
    return result == true ? null : { 'error': "wrong phone" };
  }
}
