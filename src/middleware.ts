import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthServices";

type TRole = keyof typeof roleBasedRoute;
const authRoutes = ["/login", "/register"];
const roleBasedRoute = {
  user: [/^\/user/, /^\/create-shop/],
  admin: [/^\/admin/],
};

export const middleware = async (request: NextRequest) => {
  console.log("hello world");
  const { pathname } = request.nextUrl;
  const userInfo = await getCurrentUser();

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `http://localhost:3000/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  if (userInfo.role && roleBasedRoute[userInfo.role as TRole]) {
    const routes = roleBasedRoute[userInfo.role as TRole];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  }
};

export const config = {
  matcher: ["/create-shop", "/admin/:page", "/admin", "/user", "/user/:page"],
};
