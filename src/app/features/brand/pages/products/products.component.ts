import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputErrorComponent } from '../../../../shared/components/input-error/input-error.component';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, InputErrorComponent]
})
export class ProductsComponent implements OnInit {
    products: Product[] = [];
    loading = false;
    selectedProduct: Product | null = null;
    showDetailsModal = false;
    showCreateModal = false;
    brandId: string = '';
    productForm: FormGroup;
    imagePlaceholder = 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=';

    constructor(
        private productService: ProductService,
        private notificationService: NotificationService,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {
        this.productForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.minLength(10)]],
            basePrice: ['', [Validators.required, Validators.min(0)]],
            categoryId: ['', Validators.required],
            image: [''],
            preparationTime: [15, [Validators.required, Validators.min(1)]],
            ingredients: [[]],
            nutritionalInfo: this.fb.group({
                calories: [0],
                proteins: [0],
                carbs: [0],
                fats: [0]
            }),
            isCombo: [false],
            erpSystem: ['RestPE']
        });
    }

    ngOnInit() {
        this.brandId = this.route.snapshot.params['id'];
        this.loadProducts();
    }

    loadProducts() {
        this.loading = true;
        this.productService.getAllProductsByBrandId(this.brandId).subscribe({
            next: (response) => {
                this.products = response.data;
                this.loading = false;
            },
            error: (error) => {
                this.notificationService.showNotification(
                    error.error.message || 'Error al cargar los productos',
                    'error'
                );
                this.loading = false;
            }
        });
    }

    openDetailsModal(product: Product) {
        this.selectedProduct = product;
        this.showDetailsModal = true;
    }

    closeDetailsModal() {
        this.selectedProduct = null;
        this.showDetailsModal = false;
    }

    deleteProduct(productId: string, event: Event) {
        event.stopPropagation();
        if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) return;

        this.loading = true;
        this.productService.deleteProduct(productId).subscribe({
            next: () => {
                this.notificationService.showNotification(
                    'Producto eliminado exitosamente',
                    'success'
                );
                this.loadProducts();
            },
            error: (error) => {
                this.notificationService.showNotification(
                    error.error.message || 'Error al eliminar el producto',
                    'error'
                );
                this.loading = false;
            }
        });
    }

    openCreateModal() {
        this.showCreateModal = true;
        this.productForm.reset({
            preparationTime: 15,
            isCombo: false,
            erpSystem: 'RestPE',
            nutritionalInfo: {
                calories: 0,
                proteins: 0,
                carbs: 0,
                fats: 0
            }
        });
    }

    closeCreateModal() {
        this.showCreateModal = false;
        this.productForm.reset();
    }

    createProduct() {
        if (this.productForm.invalid) return;

        const productData = {
            ...this.productForm.value,
            brandId: this.brandId
        };

        this.loading = true;
        this.productService.createProduct(productData).subscribe({
            next: () => {
                this.notificationService.showNotification(
                    'Producto creado exitosamente',
                    'success'
                );
                this.loadProducts();
                this.closeCreateModal();
            },
            error: (error) => {
                this.notificationService.showNotification(
                    error.error.message || 'Error al crear el producto',
                    'error'
                );
                this.loading = false;
            }
        });
    }

    formatIngredients(event: Event) {
        const input = event.target as HTMLTextAreaElement;
        input.value = input.value.split(',').map(i => i.trim()).join(', ');
        this.productForm.get('ingredients')?.setValue(input.value.split(', '));
    }

    getTruncatedDescription(description: string | null | undefined): string {
        if (!description) return 'Sin descripción';
        return description.length > 100 ? description.slice(0, 100) + '...' : description;
    }
}
    
