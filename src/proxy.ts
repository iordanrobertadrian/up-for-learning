import { NextResponse, type NextRequest } from "next/server";

import { ROUTES } from "@/constants/navigation";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);
  const isLogin = pathname === ROUTES.adminLogin;

  if (isLogin) {
    if (session) {
      return NextResponse.redirect(new URL(ROUTES.admin, request.url));
    }
    return NextResponse.next();
  }

  if (!session) {
    const loginUrl = new URL(ROUTES.adminLogin, request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|.*\\.).*)"],
};
