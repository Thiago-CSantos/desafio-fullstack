import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "./utils/decodeda_token_jwt.ts";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    // console.log(token, "token");
    const decoded: DecodedToken = jwtDecode<DecodedToken>(token.accessToken as string);

    if (req.nextUrl.pathname.startsWith("/admin") && !decoded.is_admin) {
        return NextResponse.redirect(new URL("/blog", req.url));
    }

    return NextResponse.next();
}


export const config = {
    matcher: ["/blog/:path*", "/admin/:path*"],
};