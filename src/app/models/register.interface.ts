import { UserRole } from "./user-role"

export interface Register {
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    avatarUrl: string,
    userRole: UserRole
}
