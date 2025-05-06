export interface RegisterResponse {
    type: string;
    message: string;
    statusCode: number;
    data: {
        id: string;
        fullName: string;
        email: string;
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
    }
}