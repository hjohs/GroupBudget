import { NextRequest,NextResponse } from "next/server";
import { updateSession } from '@/app/lib';
import { cookies } from 'next/headers';

export default async function middleware(request: NextRequest) {
    const cookieStore = await cookies();
    const session = request.cookies.get('session')?.value;
    if (request.nextUrl.pathname.startsWith("/_next")) {
        return NextResponse.next();
    }
    else if (request.nextUrl.pathname.startsWith('/login') 
            || request.nextUrl.pathname.startsWith("/_next") 
            || request.nextUrl.pathname.startsWith("/newUser")
            || request.nextUrl.pathname.startsWith("/api")) {
        return;
    }
    else if (!session) {
        console.log("SESSION EXPIRED");
        return NextResponse.redirect(new URL('/login', request.url));
    } else {
        return await updateSession(request,session);
    }
}