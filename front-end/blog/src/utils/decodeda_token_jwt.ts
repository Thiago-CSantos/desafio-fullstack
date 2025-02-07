export interface DecodedToken {
    email: string;
    exp: number
    iat: number
    is_admin?: boolean;
    jti:string
    name: string;
    token_type:string;
    user_id: string;
}