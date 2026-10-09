import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import type { NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const role = req.nextauth.token?.role;
    const path = req.nextUrl.pathname;

    if (path.startsWith("/post") && role !== "poster") {
      return NextResponse.redirect(new URL("/profile?notice=poster-only", req.url));
    }
    if (path.startsWith("/apply") && role !== "seeker") {
      return NextResponse.redirect(new URL("/profile?notice=seeker-only", req.url));
    }
    return NextResponse.next();
  },
  {
    // Must be signed in to reach any matched page
    callbacks: { authorized: ({ token }) => !!token },
    pages: { signIn: "/signup" },
  }
);

export const config = {
  matcher: ["/profile/:path*", "/apply/:path*", "/post/:path*"],
};
