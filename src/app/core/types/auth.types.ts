export type UserRole = 'SUPERADMIN' | 'OWNER' | 'MANAGER';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
}

export interface LoginResponse {
  type: string;
  message: string;
  statusCode: number;
  data: {
    user: User;
    accessToken: string;
  };
} 