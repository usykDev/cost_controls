import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


const PUBLIC_ROUTES = ["/login", "/register"];
const PROTECTED_ROUTES = ["/", "/transaction/:id"];

export function middleware(req: NextRequest) {
    const session = req.cookies.get("connect.sid")?.value
    const {pathname}= req.nextUrl

    // console.log("session: ",session)

    if(!session && PROTECTED_ROUTES.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    if(session && PUBLIC_ROUTES.includes(pathname)) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/", "/transaction/:id", "/login", "/register"], 
   };

