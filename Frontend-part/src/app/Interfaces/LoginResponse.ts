import { User } from "./User";

export interface LoginResponse {
    refreshToken: string;
    name: string;
}