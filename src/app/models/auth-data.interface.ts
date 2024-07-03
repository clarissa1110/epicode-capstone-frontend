export interface AuthData {
    user: {
        name: string,
        id?: string,
        email: string,
    },
    message: string,
    token: string
}
