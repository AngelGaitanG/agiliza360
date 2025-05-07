import { Category } from "./category.model";

export interface CreateCategoryResponse {
    type: string;
    message: string;
    statusCode: number;
    data: Category | Category[];
}
export interface GetBrandCategoriesResponse {
    type: string;
    message: string;
    statusCode: number;
    data: Category[];
}

export interface DeleteCategoryResponse {
    type: string;
    message: string;
    statusCode: number;
    data: null;
}
