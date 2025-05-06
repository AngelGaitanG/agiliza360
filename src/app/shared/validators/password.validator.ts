import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!value) {
    return null;
  }

  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumeric = /[0-9]/.test(value);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

  const errors: ValidationErrors = {};

  if (!hasUpperCase) {
    errors['requiresUppercase'] = true;
  }
  if (!hasLowerCase) {
    errors['requiresLowercase'] = true;
  }
  if (!hasNumeric) {
    errors['requiresNumber'] = true;
  }
  if (!hasSpecialChar) {
    errors['requiresSpecialChar'] = true;
  }

  return Object.keys(errors).length ? errors : null;
} 