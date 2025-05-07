import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrandService } from '../../services/brand.service';
import { UpdateBrandDto } from '../../models/brand-models/brand.dto';
import { InputErrorComponent } from '../../../../shared/components/input-error/input-error.component';
import { BRAND_CATEGORIES } from '../../../../core/models/categories.constant';
import { LANGUAGES } from '../../../../core/models/languages.constant';
import { Timezones } from '../../../../core/models/timezones.constant';
import { CustomSelectComponent } from '../../../../shared/components/custom-select/custom-select.component';
import { CustomSelectOption } from '../../../../shared/components/custom-select/custom-select.types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BrandResponse } from '../../models/brand-models/create-brand.response';

@Component({
    selector: 'app-brand-configuration',
    templateUrl: './brand-configuration.component.html',
    styleUrls: ['./brand-configuration.component.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, InputErrorComponent, CustomSelectComponent]
})
export class BrandConfigurationComponent implements OnInit, OnDestroy {
    configForm!: FormGroup;
    loading = false;
    hasChanges = false;
    initialFormValue: any = null;
    private destroy$ = new Subject<void>();
    
    brandCategories: CustomSelectOption[] = Object.values(BRAND_CATEGORIES).map(cat => ({
        label: cat,
        value: cat
    }));
    languages: CustomSelectOption[] = Object.values(LANGUAGES).map(lang => ({
        label: lang,
        value: lang
    }));
    timezones: CustomSelectOption[] = Object.values(Timezones).map(tz => ({
        label: tz,
        value: tz
    }));
    currentBrandId = localStorage.getItem('brandId') || '';

    constructor(
        private fb: FormBuilder,
        private brandService: BrandService
    ) {
        this.initForm();
    }

    private initForm(): void {
        this.configForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.required, Validators.minLength(10)]],
            businessCategory: ['', Validators.required],
            language: ['', Validators.required],
            timezone: ['', Validators.required],
            socialNetworks: this.fb.group({
                facebook: [''],
                instagram: [''],
                twitter: [''],
                website: ['']
            }),
            allowsOnlineInvoicing: [false],
            allowsReceipts: [false],
            allowsInvoices: [false],
            acceptsOnlinePayments: [false],
            currency: this.fb.group({
                name: [''],
                symbol: [''],
                code: ['', Validators.required],
                exchangeRate: [1, [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,4})?$/)]]
            })
        });

        // Suscribirse a los cambios del formulario
        this.configForm.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.checkFormChanges();
            });
    }

    ngOnInit(): void {
        this.loadBrandData();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    loadBrandData(): void {
        if (this.currentBrandId) {
            this.loading = true;
            this.brandService.getBrandById(this.currentBrandId)
                .subscribe({
                    next: (response: BrandResponse) => {
                        if (response.data) {
                            // Resetear el formulario antes de cargar nuevos datos
                            this.configForm.reset();
                            
                            // Cargar los datos de la respuesta
                            this.configForm.patchValue(response.data, { emitEvent: false });
                            
                            // Guardar el valor inicial después de que todo esté cargado
                            this.initialFormValue = this.configForm.getRawValue();
                            
                            // Forzar la detección de cambios inicial
                            this.checkFormChanges();
                        }
                        this.loading = false;
                    },
                    error: (error) => {
                        console.error('Error loading brand data:', error);
                        this.loading = false;
                    }
                });
        }
    }

    checkFormChanges(): void {
        if (!this.initialFormValue) return;

        const currentValue = this.configForm.getRawValue();
        const initialValue = this.initialFormValue;

        // Comparar cada campo individualmente
        const hasChanges = Object.keys(currentValue).some(key => {
            if (typeof currentValue[key] === 'object') {
                return JSON.stringify(currentValue[key]) !== JSON.stringify(initialValue[key]);
            }
            return currentValue[key] !== initialValue[key];
        });

        if (this.hasChanges !== hasChanges) {
            this.hasChanges = hasChanges;
        }
    }

    onSelectChange(field: string, option: CustomSelectOption): void {
        this.configForm.get(field)?.setValue(option.value);
    }

    onSubmit(): void {
        if (!this.hasChanges || !this.currentBrandId) return;

        this.loading = true;
        const updateData: UpdateBrandDto = this.configForm.getRawValue();

        this.brandService.updateBrand(this.currentBrandId, updateData)
            .subscribe({
                next: (response: BrandResponse) => {
                    if (response.data) {
                        // Actualizar el valor inicial con los nuevos datos
                        this.initialFormValue = this.configForm.getRawValue();
                        this.hasChanges = false;
                    }
                    this.loading = false;
                },
                error: (error) => {
                    console.error('Error updating brand:', error);
                    this.loading = false;
                }
            });
    }

    getErrorMessage(controlName: string, groupName?: string): string {
        const control = groupName ? 
            this.configForm.get(`${groupName}.${controlName}`) : 
            this.configForm.get(controlName);

        if (control?.errors) {
            if (control.errors['required']) {
                return 'Este campo es requerido';
            }
            if (control.errors['minlength']) {
                return `Debe tener al menos ${control.errors['minlength'].requiredLength} caracteres`;
            }
            if (control.errors['min']) {
                return 'El valor debe ser mayor a 0';
            }
            if (control.errors['pattern']) {
                return 'Formato inválido';
            }
        }
        return '';
    }
}