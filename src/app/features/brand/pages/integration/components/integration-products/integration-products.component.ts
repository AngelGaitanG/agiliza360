import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationProducts } from '../../models/get-comparison.model';

@Component({
    selector: 'app-integration-products',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './integration-products.component.html',
    styleUrls: ['./integration-products.component.scss']
})
export class IntegrationProductsComponent {
    @Input() productsInfo: IntegrationProducts | null = null;

    currentPage = 1;
    itemsPerPage = 10;
    expandedModifiers = new Set<string>();

    get paginatedProducts() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.productsInfo?.comparison?.slice(start, end);
    }

    get totalPages() {
        return Math.ceil((this.productsInfo?.comparison?.length || 0) / this.itemsPerPage);
    }

    changePage(page: number) {
        this.currentPage = page;
    }

    getRestpeProduct(id: string) {
        const product = this.productsInfo?.restaurant?.find(product => product.id === id);
        console.log('RESTPE Product:', product);
        console.log('RESTPE Modifiers:', product?.modifiers);
        return product;
    }

    getAgilizaProduct(id: string) {
        const product = this.productsInfo?.agiliza360?.find(product => product.id === id);
        console.log('AGILIZA360 Product:', product);
        console.log('AGILIZA360 Modifiers:', product?.modifiers);
        return product;
    }

    toggleOptions(productId: string) {
        console.log('Toggle Options for product:', productId);
        console.log('Current expanded modifiers:', Array.from(this.expandedModifiers));
        if (this.expandedModifiers.has(productId)) {
            this.expandedModifiers.delete(productId);
        } else {
            this.expandedModifiers.add(productId);
        }
        console.log('Updated expanded modifiers:', Array.from(this.expandedModifiers));
    }

    isExpanded(productId: string) {
        const isExpanded = this.expandedModifiers.has(productId);
        console.log('Is product expanded:', productId, isExpanded);
        return isExpanded;
    }

    toggleModifierOptions(modifierId: string) {
        console.log('Toggle Modifier Options for:', modifierId);
        console.log('Current expanded modifiers:', Array.from(this.expandedModifiers));
        if (this.expandedModifiers.has(modifierId)) {
            this.expandedModifiers.delete(modifierId);
        } else {
            this.expandedModifiers.add(modifierId);
        }
        console.log('Updated expanded modifiers:', Array.from(this.expandedModifiers));
    }

    isModifierExpanded(modifierId: string) {
        const isExpanded = this.expandedModifiers.has(modifierId);
        console.log('Is modifier expanded:', modifierId, isExpanded);
        return isExpanded;
    }

    hasModifiers(productId: string): boolean {
        const restpeProduct = this.getRestpeProduct(productId);
        const agilizaProduct = this.getAgilizaProduct(productId);
        return (restpeProduct?.modifiers?.length ?? 0) > 0 || (agilizaProduct?.modifiers?.length ?? 0) > 0;
    }
}