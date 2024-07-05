import { User } from "./user.interface";

export interface AuthData {
    user: User,
    message: string,
    token: string
}
