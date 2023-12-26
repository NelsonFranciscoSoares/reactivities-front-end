export interface User {
    username: string;
    displayName: string;
    accessToken: string;
    image?: string;
}

export interface LoginUserForm {
    email: string;
    password: string;
}

export interface RegisterUserForm {
    email: string;
    password: string;
    displayName: string;
    username: string;
}