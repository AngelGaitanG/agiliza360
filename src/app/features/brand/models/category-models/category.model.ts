export interface Category {
    _id: string;
    name: string;
    description: string;
    brandId: string;
    externalId: string;
    erpSystem: string;
    servingSize: number;
    products?: any[];
    brand: string;
    order: number;
    isActive: boolean;
}
// 			"name": "Bebidas Frías",
// 			"description": "Todas las bebidas frías y refrescantes de nuestra carta",
// 			"brandId": "681651915dd134b2933f7d1b",
// 			"externalId": "BEB-001",
// 			"erpSystem": "RestPE",
// 			"servingSize": 1,
// 			"order": 2,
// 			"isActive": true,
// 			"brand": "681651915dd134b2933f7d1b",
// 			"products": [],
// 			"__v": 0