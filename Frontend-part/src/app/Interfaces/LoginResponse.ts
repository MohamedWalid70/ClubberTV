import { User } from "./User";

export interface LoginResponse {
    refreshToken: string;
    User: User;
}