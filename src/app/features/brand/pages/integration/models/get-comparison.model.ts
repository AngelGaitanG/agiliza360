export enum StatusProductCategory {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    DELETED = 'deleted'
}

export enum ORIGINS {
    CARTA_AI = 'carta_ai',
    RESTAURANT_PE = 'restaurant_pe'
}

export interface IntegrationSideData {
    categories: Array<{
        id: string;
        name: string;
        status: StatusProductCategory;
        source: ORIGINS;
        localId: string;
        subDomain: string;
    }>;
    products: Array<{
        id: string;
        name: string;
        status: StatusProductCategory;
        source: ORIGINS;
        localId: string;
        subDomain: string;
        description?: string;
        categoryId: string;
        basePrice: number;
        isCombo: boolean;
        isOutOfStock: boolean;
        imageUrl?: string;
        modifiers: Array<{
            id: string;
            name: string;
            status: StatusProductCategory;
            source: ORIGINS;
            localId: string;
            subDomain: string;
            isMultiple: boolean;
            minQuantity: number;
            maxQuantity: number;
            options: Array<{
                id: string;
                name: string;
                status: StatusProductCategory;
                source: ORIGINS;
                localId: string;
                subDomain: string;
                price: number;
                stock: number;
            }>;
        }>;
    }>;
    modifiers: Array<{
        id: string;
        name: string;
        status: StatusProductCategory;
        source: ORIGINS;
        localId: string;
        subDomain: string;
        isMultiple: boolean;
        minQuantity: number;
        maxQuantity: number;
        options: Array<{
            id: string;
            name: string;
            status: StatusProductCategory;
            source: ORIGINS;
            localId: string;
            subDomain: string;
            price: number;
            stock: number;
        }>;
    }>;
}

export interface IntegrationComparison {
    restpe: IntegrationSideData;
    agiliza360: IntegrationSideData;
    comparison: {
        categories: Array<{
            id: string;
            existsInRestpe: boolean;
            existsInAgiliza360: boolean;
            status: 'integrated' | 'pending';
        }>;
        products: Array<{
            id: string;
            existsInRestpe: boolean;
            existsInAgiliza360: boolean;
            status: 'integrated' | 'pending';
        }>;
        modifiers: Array<{
            id: string;
            existsInRestpe: boolean;
            existsInAgiliza360: boolean;
            status: 'integrated' | 'pending';
        }>;
    };
} 

export interface IntegrationComparisonResponse {
    type: string;
    message: string;
    statusCode: number;
    data: IntegrationComparison;
}

export interface IntegrationCategories {
    agiliza360: IntegrationSideData['categories'];
    restaurant: IntegrationSideData['categories'];
    comparison: Array<{
        id: string;
        existsInRestpe: boolean;
        existsInAgiliza360: boolean;
        status: 'integrated' | 'pending';
    }>;
}

export interface IntegrationProducts {
    agiliza360: IntegrationSideData['products'];
    restaurant: IntegrationSideData['products'];
    comparison: Array<{
        id: string;
        existsInRestpe: boolean;
        existsInAgiliza360: boolean;
        status: 'integrated' | 'pending';
    }>;
}

export interface IntegrationModifiers {
    agiliza360: IntegrationSideData['modifiers'];
    restaurant: IntegrationSideData['modifiers'];
    comparison: Array<{
        id: string;
        existsInRestpe: boolean;
        existsInAgiliza360: boolean;
        status: 'integrated' | 'pending';
    }>;
}


