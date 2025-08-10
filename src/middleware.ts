import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get auth data from cookies
  const authCookie = request.cookies.get("auth-storage");

  console.log("🔍 Middleware Debug:", {
    pathname,
    hasAuthCookie: !!authCookie,
    cookieValue: authCookie?.value ? "EXISTS" : "NOT_FOUND",
  });

  // Parse the stored auth data
  let isAuthenticated = false;

  if (authCookie?.value) {
    try {
      const authData = JSON.parse(authCookie.value);
      console.log("📦 Parsed auth data:", {
        hasState: !!authData.state,
        isAuthenticated: authData.state?.isAuthenticated,
        hasUser: !!authData.state?.user,
        hasToken: !!authData.state?.token,
      });
      isAuthenticated = authData.state?.isAuthenticated || false;
    } catch (error) {
      console.error("❌ Error parsing auth cookie:", error);
      isAuthenticated = false;
    }
  }

  // Only redirect authenticated users away from auth pages
  if (
    isAuthenticated &&
    (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup"))
  ) {
    console.log("✅ Redirecting to profile - user already authenticated");
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  console.log("✅ Middleware allowing access to:", pathname);
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
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
