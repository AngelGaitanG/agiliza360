import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationCategories } from '../../models/get-comparison.model';

@Component({
    selector: 'app-integration-categories',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './integration-categories.component.html',
    styleUrls: ['./integration-categories.component.scss']
})
export class IntegrationCategoriesComponent {
    @Input() categoriesInfo!: IntegrationCategories | null;

    currentPage = 1;
    itemsPerPage = 10;

    getRestpeCategory(id: string) {
        return this.categoriesInfo?.restaurant?.find(cat => cat.id === id);
    }

    getAgilizaCategory(id: string) {
        return this.categoriesInfo?.agiliza360?.find(cat => cat.id === id);
    }

    get paginatedCategories() {
        if (!this.categoriesInfo?.comparison) return [];
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return this.categoriesInfo.comparison.slice(startIndex, startIndex + this.itemsPerPage);
    }

    get totalPages() {
        if (!this.categoriesInfo?.comparison) return 0;
        return Math.ceil(this.categoriesInfo.comparison.length / this.itemsPerPage);
    }

    changePage(page: number) {
        this.currentPage = page;
    }
}
