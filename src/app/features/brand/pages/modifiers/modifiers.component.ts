import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModifiersService } from "../../services/modifiers.service";
import { NotificationService } from "../../../../shared/services/notification.service";
import { ActivatedRoute } from "@angular/router";
import { Modifier } from "../../models/modifier-models/modifier.model";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { InputErrorComponent } from "../../../../shared/components/input-error/input-error.component";

@Component({
    selector: 'app-modifiers',
    templateUrl: './modifiers.component.html',
    styleUrls: ['./modifiers.component.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, InputErrorComponent]
})
export class ModifiersComponent implements OnInit {
    modifiers: Modifier[] = [];
    loading = false;
    brandId: string = '';
    showCreateModal = false;
    modifierForm: FormGroup;

    constructor(
        private modifiersService: ModifiersService,
        private notificationService: NotificationService,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {
        this.modifierForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.minLength(10)]],
            minSelections: [1, [Validators.required, Validators.min(0)]],
            maxSelections: [1, [Validators.required, Validators.min(1)]],
            options: [[]],
            erpSystem: ['RestPE']
        });
    }

    ngOnInit() {
        this.brandId = this.route.snapshot.params['id'];
        this.loadModifiers();
    }

    loadModifiers() {
        this.loading = true;
        this.modifiersService.getAllProductsByBrandId(this.brandId).subscribe({
            next: (response) => {
                this.modifiers = response.data;
                this.loading = false;
            },
            error: (error) => {
                this.notificationService.showNotification(
                    error.error.message || 'Error al cargar los modificadores',
                    'error'
                );
                this.loading = false;
            }
        });
    }

    deleteModifier(modifierId: string) {
        if (!confirm('¿Estás seguro de que deseas eliminar este modificador?')) return;

        this.loading = true;
        this.modifiersService.deleteModifier(modifierId).subscribe({
            next: () => {
                this.notificationService.showNotification(
                    'Modificador eliminado exitosamente',
                    'success'
                );
                this.loadModifiers();
            },
            error: (error) => {
                this.notificationService.showNotification(
                    error.error.message || 'Error al eliminar el modificador',
                    'error'
                );
                this.loading = false;
            }
        });
    }

    openCreateModal() {
        this.showCreateModal = true;
        this.modifierForm.reset({
            minSelections: 1,
            maxSelections: 1,
            erpSystem: 'RestPE',
            options: []
        });
    }

    closeCreateModal() {
        this.showCreateModal = false;
        this.modifierForm.reset();
    }

    createModifier() {
        if (this.modifierForm.invalid) return;

        const modifierData = {
            ...this.modifierForm.value,
            brandId: this.brandId
        };

        this.loading = true;
        this.modifiersService.createModifier(modifierData).subscribe({
            next: () => {
                this.notificationService.showNotification(
                    'Modificador creado exitosamente',
                    'success'
                );
                this.loadModifiers();
                this.closeCreateModal();
            },
            error: (error) => {
                this.notificationService.showNotification(
                    error.error.message || 'Error al crear el modificador',
                    'error'
                );
                this.loading = false;
            }
        });
    }
}
    
