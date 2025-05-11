import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/** An actor's name can't match the given regular expression */
export function confirmPassValidator(
    controlName: string,
    matchingControlName: string
    ): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        const passwordControl = formGroup.get(controlName);
        const confirmPasswordControl = formGroup.get(matchingControlName);

        if (!passwordControl || !confirmPasswordControl) {
            return null;
        }

        // This will eliminate all other validation errors values as it overwrites all the errors. That's why "required" validation isn't showing up
        if (passwordControl.value !== confirmPasswordControl.value) {
            confirmPasswordControl.setErrors( { passwordMismatch: true });
        } else {
            confirmPasswordControl.setErrors(null);
        }

        return null;
    };
}