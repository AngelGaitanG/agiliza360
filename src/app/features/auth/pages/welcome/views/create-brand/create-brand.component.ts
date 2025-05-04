import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomSelectComponent } from '../../../../../../shared/components/custom-select/custom-select.component';
import { CustomSelectOption } from '../../../../../../shared/components/custom-select/custom-select.types';
import { BrandService } from '../../../../../brand/services/brand.service';
import { ErrorResponse } from '../../../../../../core/models/error.model';
import { BUSINESS_CATEGORIES } from '../../../../../../core/models/brand-categories.constant';
import { LANGUAGES } from '../../../../../../core/models/languages.constant';
import { Timezones } from '../../../../../../core/models/timezones.constant';
import { InputErrorComponent } from '../../../../../../shared/components/input-error/input-error.component';

@Component({
  selector: 'app-create-brand',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CustomSelectComponent, InputErrorComponent],
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.scss']
})
export class CreateBrandComponent {
  @Output() close = new EventEmitter<void>();
  createBrandForm: FormGroup;
  loading = false;
  error = '';

  categories: CustomSelectOption[] = [
    { value: BUSINESS_CATEGORIES.IT, label: 'Electrónica y Tecnología' },
    { value: BUSINESS_CATEGORIES.RETAIL, label: 'Retail' },
    { value: BUSINESS_CATEGORIES.RESTAURANT, label: 'Restaurante' },
    { value: BUSINESS_CATEGORIES.MANUFACTURING, label: 'Manufactura' },
    { value: BUSINESS_CATEGORIES.OTHER, label: 'Otro' }
  ];

  languages: CustomSelectOption[] = [
    { value: LANGUAGES.SPANISH, label: 'Español' },
    { value: LANGUAGES.ENGLISH, label: 'Inglés' },
    { value: LANGUAGES.FRENCH, label: 'Francés' },
    { value: LANGUAGES.GERMAN, label: 'Alemán' },
    { value: LANGUAGES.ITALIAN, label: 'Italiano' }
  ];

  timezones: CustomSelectOption[] = [
    { value: Timezones.LIMA, label: 'America/Lima' },
    { value: Timezones.SANTIAGO, label: 'America/Santiago' },
    { value: Timezones.MEXICO_CITY, label: 'America/Mexico_City' },
    { value: Timezones.NEW_YORK, label: 'America/New_York' },
    { value: Timezones.LONDON, label: 'Europe/London' }
  ];

  constructor(
    private fb: FormBuilder,
    private brandService: BrandService
  ) {
    this.createBrandForm = this.fb.group({
      name: ['', [Validators.required]],
      subdomain: ['', [Validators.required]],
      description: ['', [Validators.required]],
      businessCategory: ['', [Validators.required]],
      language: ['es', [Validators.required]],
      timezone: ['America/Lima', [Validators.required]]
    });
  }

  onSubmit(): void {
    // Marcar todos los campos como touched para mostrar errores
    Object.keys(this.createBrandForm.controls).forEach(key => {
      const control = this.createBrandForm.get(key);
      control?.markAsTouched();
    });

    if (this.createBrandForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    const formData = this.createBrandForm.value;

    this.brandService.createBrand(formData).subscribe({
      next: () => {
        this.goBack();
      },
      error: (error: ErrorResponse) => {
        this.loading = false;
        if(error.error.statusCode === 400){
          this.error = error.error.message;
          this.loading = false;
        }
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onCategorySelected(option: CustomSelectOption): void {
    this.createBrandForm.get('businessCategory')?.setValue(option.value);
  }

  onLanguageSelected(option: CustomSelectOption): void {
    this.createBrandForm.get('language')?.setValue(option.value);
  }

  onTimezoneSelected(option: CustomSelectOption): void {
    this.createBrandForm.get('timezone')?.setValue(option.value);
  }

  goBack(): void {
    this.close.emit();
  }
}

