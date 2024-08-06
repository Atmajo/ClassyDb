import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if the request is for the home page
  if (request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/home") {
    // Check if the user is signed in by looking for the authToken cookie
    const authToken = request.cookies.get("user");
    if (!authToken) {
      // If the user is not signed in, redirect to the sign-in page
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }
  // Allow the request to proceed if the user is signed in or the request is not for the home page
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home", "/sign-in", "/sign-up"],
};