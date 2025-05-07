
export interface ProductDTO {
    name: string;
    categoryId: string;
    brandId: string;
    basePrice: number;
    preparationTime: number;
    description?: string;
    ingredients?: string[];
    nutritionalInfo?: {
        calories?: number;
        proteins?: number;
        carbs?: number;
        fats?: number;
    };
    image?: string;
    isCombo?: boolean;
}
// "name": "Hamburguesa Clásica",
// "categoryId": "68193c290a760ec97804054e",
// "brandId": "681651915dd134b2933f7d1b",
// "basePrice": 99.99,
// "erpSystem": "RestPE",
// "preparationTime": 15,
// "description": "Deliciosa hamburguesa con carne 100% de res",
// "ingredients": ["Pan", "Carne", "Lechuga", "Tomate"],
// "nutritionalInfo": {
//     "calories": 550,
//     "proteins": 25,
//     "carbs": 45,
//     "fats": 30
// },
// "image": "https://ejemplo.com/hamburguesa.jpg",
// "isCombo": false,