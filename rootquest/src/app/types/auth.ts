export type SignUpData = {
    username: string;
    password: string;
    email: string;
}

export type SessionPayload = {
    username: string;
    iat: number;
    exp: number;    
}

export type AuthResponse = {
    success: boolean;
    message: string;
}

export type LoginData = {
    username: string;
    password: string;
}
