import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { OptionService } from '../../services/options.service';
import { OptionDTO } from '../../models/option-models/option.dto';
import { InputErrorComponent } from '../../../../shared/components/input-error/input-error.component';

@Component({
    selector: 'app-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, InputErrorComponent]
})
export class OptionsComponent implements OnInit {
    options: any[] = [];
    loading = false;
    showCreateModal = false;
    optionForm: FormGroup;

    constructor(
        private optionService: OptionService,
        private fb: FormBuilder
    ) {
        this.optionForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            basePrice: [null, [
                Validators.required, 
                Validators.min(0),
                Validators.pattern(/^\d+(\.\d{1,2})?$/) // Valida máximo 2 decimales
            ]]
        });
    }

    ngOnInit(): void {
        this.loadOptions();
    }

    getBasePriceErrorMessage(): string {
        const control = this.optionForm.get('basePrice');
        if (control?.errors) {
            if (control.errors['required']) {
                return 'El precio base es requerido';
            }
            if (control.errors['min']) {
                return 'El precio base no puede ser negativo';
            }
            if (control.errors['pattern']) {
                return 'El precio base debe ser un número con máximo 2 decimales';
            }
        }
        return '';
    }

    loadOptions(): void {
        this.loading = true;
        const brandId = localStorage.getItem('brandId') || '';
        
        this.optionService.getAllOptionsByBrandId(brandId)
            .subscribe({
                next: (response) => {
                    this.options = response.data;
                    this.loading = false;
                },
                error: (error) => {
                    console.error('Error loading options:', error);
                    this.loading = false;
                }
            });
    }

    openCreateModal(): void {
        this.showCreateModal = true;
    }

    closeCreateModal(): void {
        this.showCreateModal = false;
        this.optionForm.reset();
    }

    createOption(): void {
        if (this.optionForm.valid) {
            this.loading = true;
            const brandId = localStorage.getItem('brandId') || '';
            
            const optionData: OptionDTO = {
                ...this.optionForm.value,
                brandId
            };
            
            this.optionService.createOption(optionData)
                .subscribe({
                    next: (response) => {
                        this.loadOptions();
                        this.closeCreateModal();
                        this.loading = false;
                    },
                    error: (error) => {
                        console.error('Error creating option:', error);
                        this.loading = false;
                    }
                });
        }
    }

    deleteOption(optionId: string): void {
        if (confirm('¿Estás seguro de que deseas eliminar esta opción?')) {
            this.loading = true;
            this.optionService.deleteOption(optionId)
                .subscribe({
                    next: () => {
                        this.loadOptions();
                    },
                    error: (error) => {
                        console.error('Error deleting option:', error);
                        this.loading = false;
                    }
                });
        }
    }
}
    
