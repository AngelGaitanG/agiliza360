export interface Modifier {
    _id: string;
    erpSystem: string;
    brandId: string;
    name: string;
    description: string;
    minSelections: number;
    maxSelections: number;
    isRequired: boolean;
    order: number;
    isActive: boolean;
    brand: string;
    options: any[];
    createdAt: string;
    updatedAt: string;
}
// "_id": "68195f0c85cf202c6cfbe0b0",
// 			"erpSystem": "RestPE",
// 			"brandId": "681651915dd134b2933f7d1b",
// 			"name": "Tipo de Cocción",
// 			"description": "Seleccione el punto de cocción de su carne",
// 			"minSelections": 1,
// 			"maxSelections": 1,
// 			"isRequired": true,
// 			"order": 1,
// 			"isActive": true,
// 			"brand": "681651915dd134b2933f7d1b",
// 			"options": [],
// 			"createdAt": "2025-05-06T00:59:56.564Z",
// 			"updatedAt": "2025-05-06T00:59:56.564Z",
// 			"__v": 0