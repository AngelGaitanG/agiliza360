import { Product } from "./product.model";

export interface CreateProductResponse {
    type: string;
    message: string;
    statusCode: number;
    data: Product;
}

export interface GetProductsByBrandResponse {
    type: string;
    message: string;
    statusCode: number;
    data: Product[];
}

export interface DeleteProductResponse {
    type: string;
    message: string;
    statusCode: number;
    data: null;
}

