
export interface Product {
    _id: string;
    name: string;
    description: string;
    categoryId: string;
    basePrice: number;
    isCombo: boolean;
    erpSystem: string;
    image: string;
    preparationTime: number;
    ingredients: string[];
    nutritionalInfo: {
        calories: number;
        proteins: number;
        carbs: number;
        fats: number;
    };
    isActive: boolean;
    category: string;
    brand: string;
    brandId: string;
    branchProducts: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;   
}

// {
//     "_id": "68194feab51b176be3792276",
//     "name": "Hamburguesa Clásica",
//     "description": "Deliciosa hamburguesa con carne 100% de res",
//     "categoryId": "68193c290a760ec97804054e",
//     "basePrice": 99.99,
//     "isCombo": false,
//     "erpSystem": "RestPE",
//     "image": "https://ejemplo.com/hamburguesa.jpg",
//     "preparationTime": 15,
//     "ingredients": [
//         "Pan",
//         "Carne",
//         "Lechuga",
//         "Tomate"
//     ],
//     "nutritionalInfo": {
//         "calories": 550,
//         "proteins": 25,
//         "carbs": 45,
//         "fats": 30
//     },
//     "isActive": true,
//     "category": "68193c290a760ec97804054e",
//     "brand": "681651915dd134b2933f7d1b",
//     "brandId": "681651915dd134b2933f7d1b",
//     "branchProducts": [],
//     "createdAt": "2025-05-05T23:55:22.210Z",
//     "updatedAt": "2025-05-05T23:55:22.210Z",
//     "__v": 0
// }