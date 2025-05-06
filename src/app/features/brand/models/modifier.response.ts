import { Modifier } from "./modifier.model";

export interface CreateModifierResponse {
    type: string;
    message: string;
    statusCode: number;
    data: Modifier;
}

export interface GetModifiersResponse {
    type: string;
    message: string;
    statusCode: number;
    data: Modifier[];
}

export interface DeleteModifierResponse {
    type: string;
    message: string;
    statusCode: number;
    data: null;
}

