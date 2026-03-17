import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const loggedInUser = request.cookies.get("loggedInUser");

    // Public routes that don't require authentication
    const isPublicRoute = request.nextUrl.pathname === "/login";

    if (!loggedInUser && !isPublicRoute) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (loggedInUser && isPublicRoute) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
