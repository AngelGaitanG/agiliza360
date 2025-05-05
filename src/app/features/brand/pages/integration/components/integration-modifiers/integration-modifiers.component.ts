import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationModifiers } from '../../models/get-comparison.model';

@Component({
    selector: 'app-integration-modifiers',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './integration-modifiers.component.html',
    styleUrls: ['./integration-modifiers.component.scss']
})
export class IntegrationModifiersComponent {
    @Input() modifiersInfo!: IntegrationModifiers | null;

    currentPage = 1;
    itemsPerPage = 10;
    expandedModifiers: Set<string> = new Set();

    getRestpeModifier(id: string) {
        return this.modifiersInfo?.restaurant?.find(mod => mod.id === id);
    }

    getAgilizaModifier(id: string) {
        return this.modifiersInfo?.agiliza360?.find(mod => mod.id === id);
    }

    get paginatedModifiers() {
        if (!this.modifiersInfo?.comparison) return [];
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return this.modifiersInfo.comparison.slice(startIndex, startIndex + this.itemsPerPage);
    }

    get totalPages() {
        if (!this.modifiersInfo?.comparison) return 0;
        return Math.ceil(this.modifiersInfo.comparison.length / this.itemsPerPage);
    }

    changePage(page: number) {
        this.currentPage = page;
    }

    toggleOptions(modifierId: string) {
        if (this.expandedModifiers.has(modifierId)) {
            this.expandedModifiers.delete(modifierId);
        } else {
            this.expandedModifiers.add(modifierId);
        }
    }

    isExpanded(modifierId: string): boolean {
        return this.expandedModifiers.has(modifierId);
    }
}
