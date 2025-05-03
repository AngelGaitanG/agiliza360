import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomSelectComponent } from '../../../../../../shared/components/custom-select/custom-select.component';
import { CustomSelectOption } from '../../../../../../shared/components/custom-select/custom-select.types';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';

interface BusinessCategory {
  value: string;
  label: string;
}

@Component({
  selector: 'app-create-brand',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CustomSelectComponent],
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.scss']
})
export class CreateBrandComponent {
  @Output() close = new EventEmitter<void>();
  createBrandForm: FormGroup;
  loading = false;
  error = '';

  categories: CustomSelectOption[] = [
    { value: 'Electrónica y Tecnología', label: 'Electrónica y Tecnología' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Restaurante', label: 'Restaurante' },
    { value: 'Servicios', label: 'Servicios' },
    { value: 'Manufactura', label: 'Manufactura' },
    { value: 'Otro', label: 'Otro' }
  ];

  languages: CustomSelectOption[] = [
    { value: 'es', label: 'Español' },
    { value: 'en', label: 'Inglés' },
    { value: 'fr', label: 'Francés' },
    { value: 'de', label: 'Alemán' },
    { value: 'it', label: 'Italiano' }
  ];

  timezones: CustomSelectOption[] = [
    { value: 'America/Lima', label: 'America/Lima' },
    { value: 'America/Santiago', label: 'America/Santiago' },
    { value: 'America/Mexico_City', label: 'America/Mexico_City' },
    { value: 'America/New_York', label: 'America/New_York' },
    { value: 'Europe/London', label: 'Europe/London' }
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
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
    if (this.createBrandForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    const formData = this.createBrandForm.value;
    const token = localStorage.getItem('auth_token'); // Asegúrate de que el token esté disponible

    if (!token) {
      this.error = 'No se encontró el token de autenticación';
      this.loading = false;
      return;
    }

    this.http.post(`${environment.apiUrl}/brand`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).subscribe({
      next: (response) => {
        this.loading = false;
        this.close.emit();
      },
      error: (error) => {
        this.loading = false;
        this.error = error.error?.message || 'Error al crear la marca';
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

