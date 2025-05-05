import { Component } from "@angular/core";
import { IntegrationService } from "./services/integration.service";
import { IntegrationCategories, IntegrationModifiers, IntegrationProducts } from "./models/get-comparison.model";
import { ErrorResponse } from "../../../../core/models/error.model";
import { CommonModule } from "@angular/common";
import { IntegrationCategoriesComponent } from "./components/integration-categories/integration-categories.component";
import { IntegrationModifiersComponent } from "./components/integration-modifiers/integration-modifiers.component";
import { IntegrationProductsComponent } from "./components/integration-products/integration-products.component";
@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss'],
  imports: [CommonModule, IntegrationCategoriesComponent, IntegrationModifiersComponent, IntegrationProductsComponent]
})
export class IntegrationComponent {
    loading = false;
    error = '';
    showIntroduction = true;
    currentStep = 1;
    productsInfo: IntegrationProducts | null = null;
    categoriesInfo: IntegrationCategories | null = null;
    modifiersInfo: IntegrationModifiers | null = null;

    brandSubdomain: string = '';
    
    constructor(private integrationService: IntegrationService) {}

    loadComparison() {
        this.loading = true;
        this.integrationService.getComparison().subscribe({
            next: (response) => {
                this.productsInfo = {
                    agiliza360: response.data.agiliza360.products,
                    restaurant: response.data.restpe.products,
                    comparison: response.data.comparison.products
                };
                this.categoriesInfo = {
                    agiliza360: response.data.agiliza360.categories,
                    restaurant: response.data.restpe.categories,
                    comparison: response.data.comparison.categories
                };
                this.modifiersInfo = {
                    agiliza360: response.data.agiliza360.modifiers,
                    restaurant: response.data.restpe.modifiers,
                    comparison: response.data.comparison.modifiers
                };
                this.loading = false;
                this.showIntroduction = false;
            },
            error: (error: ErrorResponse) => {
                this.error = error.error.message;
                this.loading = false;
            }
        });
    }

    changeStep(step: number) {
        this.currentStep = step;
    }
}

