import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategoriesService } from "../../services/categories.service";
import { Category } from "../../models/category.model";
import { NotificationService } from "../../../../shared/services/notification.service";
import { ActivatedRoute } from "@angular/router";
import { InputErrorComponent } from "../../../../shared/components/input-error/input-error.component";

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, InputErrorComponent]
})
export class CategoriesComponent implements OnInit {
    categories: Category[] = [];
    loading = false;
    showCreateModal = false;
    brandId: string = '';
    categoryForm: FormGroup;

    constructor(
        private categoriesService: CategoriesService,
        private notificationService: NotificationService,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {
        this.categoryForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.required, Validators.minLength(10)]],
        });
    }

    ngOnInit() {
        this.brandId = this.route.snapshot.params['id'];
        this.loadCategories();
    }

    loadCategories() {
        this.loading = true;
        this.categoriesService.getAllCategoriesByBrandId(this.brandId).subscribe({
            next: (categories) => {
                this.categories = categories.data;
                this.loading = false;
            },
            error: (error) => {
                this.notificationService.showNotification(
                    error.error.message || 'Error al cargar las categorías',
                    'error'
                );
                this.loading = false;
            }
        });
    }

    openCreateModal() {
        this.showCreateModal = true;
        this.categoryForm.reset();
    }

    closeCreateModal() {
        this.showCreateModal = false;
    }

    createCategory() {
        if (this.categoryForm.invalid) return;

        const categoryData = {
            ...this.categoryForm.value,
            brandId: this.brandId
        };

        this.loading = true;
        this.categoriesService.createCategory(categoryData).subscribe({
            next: (response) => {
                this.notificationService.showNotification(
                    'Categoría creada exitosamente',
                    'success'
                );
                this.loadCategories();
                this.closeCreateModal();
                this.loading = false;
            },
            error: (error) => {
                this.notificationService.showNotification(
                    error.error.message || 'Error al crear la categoría',
                    'error'
                );
                this.loading = false;
            }
        });
    }

    deleteCategory(categoryId: string) {
        if (!confirm('¿Estás seguro de que deseas eliminar esta categoría?')) return;

        this.loading = true;
        this.categoriesService.deleteCategory(categoryId).subscribe({
            next: () => {
                this.notificationService.showNotification(
                    'Categoría eliminada exitosamente',
                    'success'
                );
                this.loadCategories();
            },
            error: (error) => {
                this.notificationService.showNotification(
                    error.error.message || 'Error al eliminar la categoría',
                    'error'
                );
                this.loading = false;
            }
        });
    }
}
    
