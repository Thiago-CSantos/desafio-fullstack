import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

declare module "next-auth" {
    interface User {
        accessToken?: string;
        refresh?: string;
    }

    interface Session {
        user: {
            accessToken?: string;
            refresh?: string;
            name: string;
            email: string;
            image: string;
        };
    }

}

interface CustomJwtPayload {
    jti: string;
    name: string;
    email: string;
    exp: number;
    iat: number;
    [key: string]: any;
}

const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',

            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                if (!credentials) {
                    return null;
                }
                try {

                    const { email, password } = credentials;
                    const r: Response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login/`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password })
                    });

                    if (!r.ok) {
                        throw new Error("Falha na autenticação.");
                    }
                    const res = await r.json();
                    const decoded = jwtDecode<CustomJwtPayload>(res.access);

                    return {
                        id: decoded.jti || '',
                        accessToken: res.access,
                        refresh: res.refresh,
                        name: decoded.name,  
                        email: decoded.email 
                    };
                }
                catch (error) {
                    console.log(error, "error");
                    throw new Error("Erro ao autenticar. Verifique suas credenciais.");
                }
            }
        })
    ],
    pages: {
        signIn: "/login"
    },

    callbacks: {
        async jwt({ token, user }) {
            
            if (user) {
                token.accessToken = user.accessToken;
                token.refresh = user.refresh;
            }

            return token;
        },
        async session({ session, token }) {
            
            session.user.accessToken = token.accessToken as string | undefined;
            session.user.refresh = token.refresh as string | undefined;
            session.user.name = token.name as string; 
            session.user.email = token.email as string; 
            session.user.image = ''
            return session;
        }
    },
}

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions }