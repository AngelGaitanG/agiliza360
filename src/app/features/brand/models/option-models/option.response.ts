import { Option } from "./option.model";

export interface CreateOptionResponse {
    type: string;
    message: string;
    statusCode: number;
    data: Option
}

export interface GetOptionsByBrandResponse {
    type: string;
    message: string;
    statusCode: number;
    data: Option[];
}

export interface DeleteOptionResponse {
    type: string;
    message: string;
    statusCode: number;
    data: null;
}