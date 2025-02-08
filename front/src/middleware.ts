import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


const PUBLIC_ROUTES = ["/login", "/register"];
const PROTECTED_ROUTES = ["/", /^\/transaction\/[^\/]+$/]; // Matching "/transaction/:id"

export function middleware(req: NextRequest) {
    const session = req.cookies.get("connect.sid")?.value
    const {pathname}= req.nextUrl

    const isProtected = PROTECTED_ROUTES.some((route) => 
    typeof route === "string" ? pathname === route : route.test(pathname)
    )

    if (!session && isProtected) {
        // return NextResponse.redirect(new URL("/login", req.url));
        return NextResponse.redirect(`${req.nextUrl.origin}/login`);

    }

    if(session && PUBLIC_ROUTES.includes(pathname)) {
        // return NextResponse.redirect(new URL('/', req.url))
        return NextResponse.redirect(`${req.nextUrl.origin}/`);

    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/", "/transaction/:path*", "/login", "/register"], 
   };

