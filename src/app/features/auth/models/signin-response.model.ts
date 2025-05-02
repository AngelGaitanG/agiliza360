import { User } from "./user.model"

export interface SigninResponse {
  type: string;
  message: string;
  statusCode: number;
  data: {
    user: User;
    accessToken: string;
  } | null;
}
