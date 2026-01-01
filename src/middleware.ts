import { auth } from "@/auth";

export default auth((req) => {
  // logic handled in auth.config callbacks
});

export const config = {
  // Matcher ignoring static files
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
