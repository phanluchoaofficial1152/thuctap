import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const cookies = req.cookies;
  const accessToken = cookies.get("access_token");
  const url = req.nextUrl.clone();
  const pathname = url.pathname as string;

  if (accessToken && url.pathname === "/pages/taikhoan/dangky") {
    if (pathname !== "/") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  if (!accessToken) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/pages/taikhoan/dangky"],
};
